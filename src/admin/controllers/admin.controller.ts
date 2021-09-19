import { RequestHandler } from "express";
import express from 'express';
import { worklogsModel } from "../../worklogs/models/worklogs.model";
import { validationResult } from "express-validator";
import { adminModel } from "../models/admin.models";
import { userModel } from "../../users/models/users.models";

class AdminController{
    today = new Date()
    createdDate = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();

    adminDashboard : RequestHandler = async(req:express.Request, res:express.Response, next:express.NextFunction)=>{
        const tasks = await worklogsModel.getAllTask();
        const feedbacks = await adminModel.getAllFeedback();
        res.render('admin/admin', {tasks,feedbacks});
    }

    adminWorklog : RequestHandler = async(req:express.Request, res:express.Response)=> {
        const tasks = await worklogsModel.getAllTask();
        res.render('admin/admin-worklogs', {tasks})
    }

    getUsers : RequestHandler = async(req:express.Request, res:express.Response) =>{
        const users = await userModel.findAll()
        res.render('admin/admin-users', {users})
    }

    getAddFeedback : RequestHandler = async(req:express.Request, res:express.Response) =>{
        const taskId = +req.params.id;
        const [task] = await worklogsModel.getTaskById(taskId);
        const createdDate = this.createdDate;
        res.render('admin/admin-feedback', {task, createdDate, taskId});
    }

    addFeedback : RequestHandler = async(req:express.Request, res:express.Response) => {
        const errors = this.checkValidation(req)
        const taskId = +req.params.id;
        const [task] = await worklogsModel.getTaskById(taskId);
        const createdDate = this.createdDate;
        if(errors){
            return res.render('admin/admin-feedback', {errors , task, createdDate, taskId});
        }
        try {
            await adminModel.createFeedback(req.body.comment , req.body.created_date , taskId)
            return res.redirect('/admin/worklogs')
        } catch (error) {
            return res.render('admin/admin-feedback', {errors:[{msg:"Something went wrong!"}] , task, createdDate, taskId});
        }
         
    }

    checkValidation  = (req:express.Request) => {
        const errors = validationResult(req);
        console.log(errors)
        if(!errors.isEmpty()){
                return errors.array();
            }
        }
    }

export let adminController = new AdminController();
