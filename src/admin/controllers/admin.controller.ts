import { RequestHandler } from "express";
import express from 'express';

class AdminController{
    adminDashboard: RequestHandler = async(req:express.Request, res:express.Response, next:express.NextFunction)=>{
        res.render('admin');
    }
}

export let adminController = new AdminController();
