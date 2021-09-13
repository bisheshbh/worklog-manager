import { RequestHandler, response, Router } from "express";
import express from 'express'
import bodyParser from "body-parser";
import { check, validationResult } from "express-validator";
import {userModel} from '../models/users.models'
import {usersService} from "../services/users.service";
import {departmentModel} from "../../department/models/department.models";

class UsersController { 


    getLogin : RequestHandler  = async(req:express.Request , res:express.Response, next:express.NextFunction) => {
        res.render('login')
    }


    getRegister : RequestHandler = async(req:express.Request, res:express.Response, next:express.NextFunction) => {
        const departments = await departmentModel.getDepartmentData()
        res.render('register', {departments})
    }

    register: RequestHandler = async(req:express.Request ,res:express.Response, next:express.NextFunction)=>{
        let errors = this.checkValidation(req);
        if(errors){

            res.render('register', {errors:errors, departments:await departmentModel.getDepartmentData()});

        }
        try{
            if(await userModel.create(req.body)){
                console.log("created");
                res.redirect('/users/login');
            }
            res.render('register', {errors:[{'msg':'Something is wrong!', }], departments:await departmentModel.getDepartmentData()});
        }catch(err){
            res.render('register', {departments:await departmentModel.getDepartmentData()});
        }
    }

    login : RequestHandler = async(req:express.Request, res:express.Response , next:express.NextFunction) => {
        let errors = this.checkValidation(req);
        if(errors){
            return res.render('login', {errors:errors});
        }
        try {
            if(await usersService.match(req.body.email, req.body.password)){
                let cookie : string = usersService.login(req.body.email);
                res.cookie("sid", cookie);
                res.send("DOne");
            }
            res.render('login', {errors:[{'msg':'Username or password is invalid'}]})
        } catch (error) {
            return error;
        }

    }

    checkValidation = (req:express.Request) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
                return errors.array()
        }
    }

    logout : RequestHandler = (req : express.Request, res:express.Response) => {
        res.clearCookie('sid')
        res.redirect('/users/login')
    }

}

export let usersController = new UsersController()
