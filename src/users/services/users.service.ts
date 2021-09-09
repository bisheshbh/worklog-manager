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

    

function getUserPassword(email:string, callback:any){
    let storedPassword:string;
    connection.query('SELECT PASSWORD FROM user WHERE EMAIL = ?',[email], (err, rows, field) => {
        if(!err){
            if(rows.length!=0){
                return callback(rows[0].PASSWORD)
            }
            console.log(false)
            return callback(false)
           
        }
      
        return callback(err)
    }) 
    
}

function generateCookie(email:string){
    let toEncryptCookie = AES.encrypt(email , "introcept").toString()
    return toEncryptCookie
}

function decryptCookie(cookie:any){
    let toDecryptCookie = AES.decrypt(cookie , "introcept").toString()
    return toDecryptCookie
}

export function loginUser(email : string , password : string, callback:any){
    getUserPassword(email, (storedPassword:string)=>{
        if(storedPassword){
            let access = passwordHash.verify(password , storedPassword)
            if(access){
                let cookie = generateCookie(email)
                return callback(access, cookie)
            }
        }
        return callback(false)
    })
}


