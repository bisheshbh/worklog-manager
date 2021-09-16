import { RequestHandler } from "express";
import express from 'express';
import { worklogsModel } from "../../worklogs/models/worklogs.model";

class AdminController{
    adminDashboard: RequestHandler = async(req:express.Request, res:express.Response, next:express.NextFunction)=>{
        res.render('admin/admin');
    }

    adminWorklog : RequestHandler = async(req:express.Request, res:express.Response)=> {
        const tasks = await worklogsModel.getAllTask();
        res.render('admin/admin-worklogs', {tasks})
    }

    getAddFeedback : RequestHandler = async(req:express.Request, res:express.Response) =>{
        console.log(req.params.id)
        res.render('admin/admin-feedback')
    }
}

export let adminController = new AdminController();
