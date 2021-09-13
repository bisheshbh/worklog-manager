import { RequestHandler, response, Router } from "express";
import express from 'express'
import bodyParser from "body-parser";
import {usersService} from "../../users/services/users.service";
import { check, validationResult } from "express-validator";

class WorklogsController {

    getMain : RequestHandler = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        let today = new Date()
        let userId = await usersService.getCurrentUserId(req.cookies.sid)
        const data = {
            user_id : userId,
            created_date : today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        }
       
        res.render('worklogs/dashboard', {data:data})
    }

    createTask : RequestHandler = async() => {
        return
    }

    checkValidation  = (req:express.Request) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
                return errors.array()
        }
    }

}

export let worklogsController = new WorklogsController()
