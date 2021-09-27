import {db} from "../../database/config";
import passwordHash from 'password-hash';
import { stringify } from "querystring";
import {AES, enc} from 'crypto-js';
import {userModel} from "../models/users.models";
import { User } from "../types/users.types";

class UsersService {

    match = async(email:string , password:string) => {
        try{
            const result:any = await userModel.getOne(email);
            if(result.length!=0){
                let passwordMatchStatus = passwordHash.verify(password, result[0].password);
                if(passwordMatchStatus){
                    return true;
                }
            }
        }catch(error){
            return false;
        }
    }

    generateCookie = (email:string):string=>{
        let toEncryptCookie = AES.encrypt(email , "introcept").toString();
        return toEncryptCookie;
    }

    decryptCookie = (cookie : string)=>{
        let bytes = AES.decrypt(cookie , "introcept");
        var decryptValue = bytes.toString(enc.Utf8);
        return decryptValue
    }

    login = (email:string) => {
        let cookie = this.generateCookie(email);
        return cookie;
    }

    getCurrentUserId = async(cookie:string) => {
        let user = this.decryptCookie(cookie);
        const userData: User[] = await userModel.getOne(user);
        const [currentUser] = userData;
        return currentUser.id;
    }
}

export let usersService = new UsersService();
