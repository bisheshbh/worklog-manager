import { RequestHandler, response, Router } from "express";
import express from 'express';

class AdminController{

    adminDashboard = async(req:express.Request, res:express.Response, next:express.NextFunction)=>{
        res.render('admin');
    }
}

export let adminController = new AdminController();
