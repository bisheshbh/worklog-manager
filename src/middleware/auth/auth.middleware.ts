import usersService from "../../users/services/users.service";
import express from 'express'
import cookieParser from "cookie-parser";
import userModel from "../../users/models/users.models";


class Auth {

    checkAuth =  (req:express.Request, res:express.Response, next:express.NextFunction)=>{
        try {
            let cookie =  req.cookies;
            if(cookie.sid){
                next();
            }
            res.redirect('/users/login');
        }catch(e){
            return res.redirect('/users/login');
            
        }
    }

    checkAdminAuth = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        try{
            let cookie = req.cookies;
            if(cookie.sid){
                let user = usersService.decryptCookie(cookie.sid);
                console.log(user);
                if(typeof user != 'undefined'){
                    let result:any = await userModel.findOne(user);
                    if(result.length != 0){
                        if(result[0].is_admin){
                            return next();
                        }
                    }
                }
            }
            return res.redirect('/worklogs/main');
        }catch(e){
            return res.redirect('/worklogs/main');
        }
    }
}

let auth = new Auth();
export default auth;