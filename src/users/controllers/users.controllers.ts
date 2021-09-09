import { NextFunction, request, RequestHandler, response } from "express";
import  {connection}  from "../../database/config";
import { getUsers, loginUser, registerUser } from "../services/users.service";
import { Router } from "express";
import express from 'express'
import bodyParser from "body-parser";
import { check, validationResult } from "express-validator";
import { url } from "inspector";

var urlencodedParser = bodyParser.urlencoded({ extended: false }) 


const router = Router()

router.get('/register', (req ,res , next) => {
    res.render('register')
})

router.post('/register', urlencodedParser, [
    check('username', 'Username is required')
    .not().isEmpty(),
    check('email', 'Email is required')
    .not().isEmpty(),
    check('email', 'Email must be valid')
    .isEmail(),
    check('password', 'Password must be atleast 8 characters long')
    .isLength({min:8}),
    check('address', 'Address must not be empty')
    .not().isEmpty()
],(req: express.Request, res: express.Response, next: express.NextFunction)=> {
    const allErrors = validationResult(req)
    if(!allErrors.isEmpty()){
        const errors = allErrors.array()
        res.render('register', {
            errors
        })
    }else{
        let username : string = req.body.username 
        let email : string = req.body.email 
        let password : string = req.body.password 
        let dateofbirth : string = req.body.date_of_birth
        let address : string = req.body.address
        let isadmin = false 
        registerUser(username , email , password , dateofbirth, address , isadmin, function(response:any){
            if(response == true){
                res.send("Success")
            }else{
                res.render('register', {
                    sqlerror : response.sqlMessage
                })
            }
        })
        
   }
})

router.get('/login', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render('login')
})

router.post('/login', urlencodedParser, [
    check('email', 'Email is required')
    .not().isEmpty(),
    check('email', 'Email must be valid')
    .isEmail(),
    check('password', 'Password is required')
    .not().isEmpty()
], (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    const allErrors = validationResult(req)
    if(!allErrors.isEmpty()){
        const errors = allErrors.array()
        res.render('login', {
            errors
        })
    }else{
        let email: string = req.body.email
        let password : string = req.body.password
        loginUser(email , password, function(response:any, cookie:string){
            if(response==true){
                    res.cookie('sid', cookie, {
                        maxAge:5000,
                        expires: new Date('01 12 2021'),
                        secure:true,
                        httpOnly:true,
                        sameSite:'lax'
                    })
                    res.send("Success")
            }else{
                res.render('login', {
                    sqlerror : "Username or password is invalid"
                })
            }
        })
            
        
    }
})

router.get('/logout', (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    res.clearCookie('sid')
    res.redirect('/users/login')

})

export default router;

