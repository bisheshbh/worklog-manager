import {connection} from "../../database/config";
import passwordHash from 'password-hash'
import { stringify } from "querystring";
import {v4} from 'uuid';
import {AES} from 'crypto-js'


const uuid = v4()

export function getUsers(email : string):Object{
    connection.query('SELECT * FROM USER WHERE email = ?', [email], (err, rows, fields) => {
        if(!err){
            return rows
        }
        return err
    })
    return {}
}

export function registerUser(username:string , email:string , password:string , dateofbirth:string, address:string , isadmin:boolean, callback:(result:boolean|object)=>void){
    const hashedPassword = passwordHash.generate(password);
    const userId = uuid
    var result;
    connection.query('INSERT INTO user VALUES(? , ? , ? , ? , ? , ? , ?)', [userId, username , email , hashedPassword, dateofbirth, address , isadmin], (err, rows ,fields) => {
        if(err){
            result = err
            return callback(result)

        }else{
            return callback(true)

        }
    })
    
}

function getUserPassword(email:string, callback:(result:boolean|string)=>void){
    let storedPassword:string;
    connection.query('SELECT PASSWORD FROM user WHERE EMAIL = ?',[email], (err, rows, field) => {
        if(!err){
            if(rows.length!=0){
                return callback(rows[0].PASSWORD)
            }
            return callback(false)
           
        }
      
        return callback(false)
    }) 
    
}

function generateCookie(email:string):string{
    let toEncryptCookie = AES.encrypt(email , "introcept").toString()
    return toEncryptCookie
}

export function decryptCookie(cookie:any):string{
    let toDecryptCookie = AES.decrypt(cookie , "introcept").toString()
    if(toDecryptCookie){
        return toDecryptCookie

    }
    return ""
}

export function loginUser(email : string , password : string, callback:any){
    getUserPassword(email, (storedPassword:string|boolean)=>{
        if(typeof storedPassword === 'string'){
            let access = passwordHash.verify(password , storedPassword)
            if(access){
                let cookie = generateCookie(email)
                return callback(access, cookie)
            }
        }
        return callback(false)
    })
}


