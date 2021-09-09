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

export function registerUser(username:string , email:string , password:string , dateofbirth:string, address:string , isadmin:boolean, callback:any){
    console.log(dateofbirth)
    const hashedPassword = passwordHash.generate(password);
    const user_id = uuid
    var result;
    connection.query('INSERT INTO user VALUES(? , ? , ? , ? , ? , ? , ?)', [user_id, username , email , hashedPassword, dateofbirth, address , isadmin], (err, rows ,fields) => {
        if(err){
            result = err
            return callback(result)

        }else{
            return callback(true)

        }
    })
    
}

    

function getUserPassword(email:string, callback:any){
    let storedPassword:string;
    connection.query('SELECT PASSWORD FROM user WHERE EMAIL = ?',[email], (err, rows, field) => {
        if(!err){
            return callback(rows)
        }
      
        return callback(err)
    }) 
    
}

function generateCookie(email:string){
    let encrypted = AES.encrypt(email , "introcept").toString()
    return encrypted
}

function decryptCookie(cookie:any){
    let decrypted = AES.decrypt(cookie , "introcept").toString()
    return decryptCookie
}

export function loginUser(email : string , password : string, callback:any){
    getUserPassword(email, (storedPassword:string)=>{
        if(storedPassword){
            console.log(storedPassword)
            let access = passwordHash.verify(password , storedPassword)
            console.log(access)
            if(access){
                let cookie = generateCookie(email)
                return callback(access, cookie)
            }
            
        }
    })
}


