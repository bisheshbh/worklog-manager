import { RequestHandler, response, Router } from "express";
import express from 'express';
import bodyParser from "body-parser";
import {usersService} from "../../users/services/users.service";
import { check, validationResult } from "express-validator";
import { worklogsModel } from "../models/worklogs.model";
import { create } from "domain";

class WorklogsController {
    today = new Date()
    created_date = this.today.getFullYear()+'-'+"0"+(this.today.getMonth()+1)+'-'+this.today.getDate();


    getMain : RequestHandler = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        const tasks = await worklogsModel.getAllUserTask(req.cookies.sid);
        const feedbacks = await worklogsModel.getAllUserFeedback(req.cookies.sid)
        if(req.query.error){
            const error = req.query.error
            return res.render('worklogs/dashboard', {tasks, feedbacks, error});

        }
        return res.render('worklogs/dashboard', {tasks, feedbacks});
        
    }
    
    getCreateTask : RequestHandler = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        const userId = await usersService.getCurrentUserId(req.cookies.sid);
        const data = {
            user_id : userId,
            created_date : this.created_date
        }
        res.render('worklogs/create-worklog', {data});
    }

    createTask : RequestHandler = async(req:express.Request , res:express.Response) => {
        const errors = this.checkValidation(req);
        const userId = await usersService.getCurrentUserId(req.cookies.sid);
        const data = {
            user_id : userId, 
            created_date:this.created_date
        }
        if(errors){
            return res.render('worklogs/create-worklog', {errors,data});
        }
        try {
            await worklogsModel.create(req.body.task_description, req.body.created_date, req.body.user_id)
            return res.redirect('/worklogs/main');
        } catch (error) {
            return res.render('worklogs/create-worklog', {errors:[{msg:'Something is wrong !'}], data});
        }
    }

    getUpdateTask : RequestHandler = async(req:express.Request, res:express.Response) => {
        const userId = await usersService.getCurrentUserId(req.cookies.sid);
        const [task] = await worklogsModel.getTaskById(+req.params.id);
        if(this.created_date != task.created_date){
            const error  = encodeURIComponent("Access denied . Today's post can only be edited")
            return res.redirect("/worklogs/main?error="+error)
        }
        return res.render('worklogs/update-worklog', {task, userId})
    }

    updateTask : RequestHandler = async(req:express.Request, res:express.Response) => {
        const errors = this.checkValidation(req);
        const userId = await usersService.getCurrentUserId(req.cookies.sid);
        const [task] = await worklogsModel.getTaskById(+req.params.id); 
        if(errors){
            return res.render('worklogs/update-worklog', {errors,task, userId});
        }
        try {
            await worklogsModel.updateTask(req.body.task_description, req.body.created_date, task.id)
            return res.redirect('/worklogs/main');
        } catch (error) {
            return res.render('worklogs/update-worklog', {errors:[{msg:'Something is wrong !'}], task, userId});
        }
    }

    checkValidation  = (req:express.Request) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
                return errors.array();
            }
        }
    }

export let worklogsController = new WorklogsController();
