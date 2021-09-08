import { RequestHandler } from "express";
import { connection } from "../../database/config";
import { getUsers, registerUser } from "../services/users.service";
import { Router } from "express";
import express from 'express'
import bodyParser from "body-parser";
import { check, validationResult } from "express-validator";
import { url } from "inspector";
// const app = express()


const router = Router()
const urlencodedParser = bodyParser.urlencoded({extended:false})
router.get('/register', (req ,res , next) => {
    res.render('register')
})

router.post('/register', [
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
],(req: { body: { username: string; email: string; password: string; dateofbirth: string; address: string; }; }, res: any, next: any)=> {
    const allErrors = validationResult(req)
    if(allErrors){
        const errors = allErrors.array()
        res.render('register', {
            errors
        })
    }else{

    let username : string = req.body.username 
    let email : string = req.body.email 
    let password : string = req.body.password 
    let dateofbirth : string = req.body.dateofbirth
    let address : string = req.body.address
    let isadmin = false 
    const createdUser = registerUser(username , email , password , dateofbirth, address , isadmin)
    if(createdUser){
        res.send("Success")
        }
    }
})

export default router;

