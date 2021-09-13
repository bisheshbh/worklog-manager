import {db} from "../../database/config";
import passwordHash from 'password-hash'
import { stringify } from "querystring";
import {AES, enc} from 'crypto-js'
import {userModel} from "../models/users.models";



class UsersService {

    match = async(email:string , password:string) => {
        const result:any = await userModel.findOne(email)
        if(result != false){
            let passwordMatchStatus = passwordHash.verify(password, result[0].password)
            if(passwordMatchStatus){
                return true
            }
        }
        return false
    }

    generateCookie = (email:string):string=>{
        let toEncryptCookie = AES.encrypt(email , "introcept").toString()
        return toEncryptCookie;
    }

    decryptCookie = (cookie : string)=>{
        let bytes = AES.decrypt(cookie , "introcept")
        var decryptValue = bytes.toString(enc.Utf8)
        console.log("decrypt cookie function",decryptValue)
        if(decryptValue){
            return decryptValue
        }
    }

    login = (email:string) => {
        let cookie = this.generateCookie(email)
        return cookie
    }

    getCurrentUserId = async(cookie:string) => {
        let user = this.decryptCookie(cookie)
        if(user){
            const userData : any= await userModel.findOne(user)
            if(userData.length != 0){
                return userData[0].id
            }
        }
    }
}

export let usersService = new UsersService()
