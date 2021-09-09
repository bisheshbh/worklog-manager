import { NextFunction, request, RequestHandler } from "express";
import  {connection}  from "../../database/config";
import { getUsers, registerUser } from "../services/users.service";
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
    }
    else{

        let username : string = req.body.username 
        let email : string = req.body.email 
        let password : string = req.body.password 
        let dateofbirth : string = req.body.date_of_birth
        let address : string = req.body.address
        let isadmin = false 
        const createdUser= registerUser(username , email , password , dateofbirth, address , isadmin)
        console.log("dsd", createdUser)
   }
})

export default router;

