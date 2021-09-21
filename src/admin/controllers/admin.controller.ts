import { RequestHandler } from "express";
import express from 'express';
import { worklogsModel } from "../../worklogs/models/worklogs.model";
import { Result, ValidationError, validationResult } from "express-validator";
import { adminModel } from "../models/admin.models";
import { userModel } from "../../users/models/users.models";
import { departmentModel } from "../../department/models/department.models";
import { RowDataPacket } from "mysql2/promise";
import { Url } from "url";
import { User } from "../../users/types/users.types";
import { usersService } from "../../users/services/users.service";

class AdminController{
    today = new Date()
    createdDate = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();

    adminDashboard : RequestHandler = async(req:express.Request, res:express.Response, next:express.NextFunction)=>{
        const tasks:object|[] = await worklogsModel.getAllTask();
        const feedbacks:object|[] = await adminModel.getAllFeedback();
        const info = req.query.info;
        res.render('admin/admin', {tasks,feedbacks, info});
    }

    adminWorklog : RequestHandler = async(req:express.Request, res:express.Response)=> {
        const info = req.query.info;
        let tasks:object|[] = await worklogsModel.getAllTask();
        const departments : any = await departmentModel.getDepartmentData();
        
        if(req.query.date){
            tasks = await worklogsModel.filterTaskByDate(req.query.date.toString(),req.cookies.sid , false);
            return res.render('admin/admin-worklogs', {tasks, departments, info});
        }
        if(req.query.department){
            tasks = await worklogsModel.filterTaskByDepartment(+req.query.department);
            return res.render('admin/admin-worklogs', {tasks, departments, info});
        }
        res.render('admin/admin-worklogs', {tasks, departments, info});
    }

    getUsers : RequestHandler = async(req:express.Request, res:express.Response) =>{
        const users:object|[] = await userModel.findAll();
        const info = req.query.info
        res.render('admin/admin-users', {users, info});
    }

    getAddFeedback : RequestHandler = async(req:express.Request, res:express.Response) =>{
        const taskId:number = +req.params.id;
        const [task] = await worklogsModel.getTaskById(taskId);
        const createdDate:string = this.createdDate;
        res.render('admin/admin-feedback', {task, createdDate, taskId});
    }

    addFeedback : RequestHandler = async(req:express.Request, res:express.Response) => {
        const errors:ValidationError[]|undefined = this.checkValidation(req)
        const taskId:number = +req.params.id;
        const userId: number = await usersService.getCurrentUserId(req.cookies.sid);
        const [task] = await worklogsModel.getTaskById(taskId);
        const createdDate:string = this.createdDate;
        if(errors){
            return res.render('admin/admin-feedback', {errors , task, createdDate, taskId});
        }
        try {
            await adminModel.createFeedback(req.body.comment , req.body.created_date , taskId, userId);
            return res.redirect('/admin/worklogs');
        } catch (error) {
            return res.render('admin/admin-feedback', {errors:[{msg:"Something went wrong!"}] , task, createdDate, taskId});
        }
         
    }

    getUpdateUser : RequestHandler = async(req:express.Request, res:express.Response) => {
        const userId = +req.params.id;
        const info = req.query.info;
        const [user] = await userModel.findOneFromId(userId);
        return res.render('admin/update-user', {userId, user, info})
    }

    updateUser : RequestHandler = async(req:express.Request, res:express.Response) => {
        const userId:number = +req.params.id;
        const info = req.query.info;
        const [user] = await userModel.findOneFromId(userId);
        const errors:ValidationError[]|undefined = this.checkValidation(req);
        if(errors){
            res.render('admin/update-user', {errors , userId, info, user});
        }
        try {
            if(req.body.admin){
                await userModel.updateUser(userId, req.body.username , req.body.email_address, +req.body.admin);
                return res.redirect('/admin/users/?info='+encodeURIComponent("User updated successfully"));
            }
            await userModel.updateUser(userId, req.body.username , req.body.email_address, 1);
            return res.redirect('/admin/users/?info='+encodeURIComponent("User updated successfully"));
        } catch (error) {
            return res.render('admin/update-user', {errors:[{msg:'Something is wrong!'}], userId, info, user});
        }
    }

    deleteUpdate : RequestHandler = async(req:express.Request, res:express.Response) => {
        const taskId:number = +req.params.id;
        try {
            await worklogsModel.deleteTask(taskId);
            return res.redirect('/admin/worklogs?info='+encodeURIComponent("Update deleted successfully"));
        } catch (error) {
            return res.redirect('/admin/worklogs');
        }
    }

    checkValidation  = (req:express.Request) => {
        const errors:Result<ValidationError> = validationResult(req);
        if(!errors.isEmpty()){
                return errors.array();
            }
        }
    }

export let adminController = new AdminController();
