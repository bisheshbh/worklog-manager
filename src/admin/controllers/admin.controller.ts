import { RequestHandler } from "express";
import express from 'express';
import { worklogsModel } from "../../worklogs/models/worklogs.model";
import { validationResult } from "express-validator";
import { adminModel } from "../models/admin.models";
import { userModel } from "../../users/models/users.models";
import { departmentModel } from "../../department/models/department.models";
import { RowDataPacket } from "mysql2/promise";

class AdminController{
    today = new Date()
    createdDate = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();

    adminDashboard : RequestHandler = async(req:express.Request, res:express.Response, next:express.NextFunction)=>{
        const tasks = await worklogsModel.getAllTask();
        const feedbacks = await adminModel.getAllFeedback();
        res.render('admin/admin', {tasks,feedbacks});
    }

    adminWorklog : RequestHandler = async(req:express.Request, res:express.Response)=> {
        let tasks = await worklogsModel.getAllTask();
        const departments : RowDataPacket = await departmentModel.getDepartmentData();
        
        if(req.query.date){
            tasks = await worklogsModel.filterTaskByDate(req.query.date.toString(),req.cookies.sid , false)
            return res.render('admin/admin-worklogs', {tasks, departments})
        }
        if(req.query.department){
            tasks = await worklogsModel.filterTaskByDepartment(+req.query.department)
            return res.render('admin/admin-worklogs', {tasks, departments})
        }
        res.render('admin/admin-worklogs', {tasks, departments})
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

    getUpdateUser : RequestHandler = async(req:express.Request, res:express.Response) => {
        const userId = +req.params.id;
        const info = req.query.info;
        const [user] = await userModel.findOneFromId(userId)
        return res.render('admin/update-user', {userId, user, info})
    }

    updateUser : RequestHandler = async(req:express.Request, res:express.Response) => {
        const userId = +req.params.id;
        const info = req.query.info;
        const [user] = await userModel.findOneFromId(userId)

        const errors = this.checkValidation(req)
        if(errors){
            res.render('admin/update-user', {errors , userId, info, user})
        }
        try {
            await userModel.updateUser(userId, req.body.username , req.body.email_address)
            return res.redirect('/admin/update-user/'+userId+'?info='+encodeURIComponent("User updated successfully"))
        } catch (error) {
            return res.render('admin/update-user', {errors:[{msg:'Something is wrong!'}], userId, info, user})
        }
    }

    deleteUpdate : RequestHandler = async(req:express.Request, res:express.Response) => {
        const taskId = +req.params.id;
        try {
            await worklogsModel.deleteTask(taskId)
            return res.redirect('/admin/worklogs?info='+encodeURIComponent("Update deleted successfully"))
        } catch (error) {
            console.log(error)
            return res.redirect('/admin/worklogs')
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
