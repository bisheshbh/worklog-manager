import {connection} from "../../database/config";
import passwordHash from 'password-hash'
import { stringify } from "querystring";
import {v4} from 'uuid';


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

export function registerUser(username:string , email:string , password:string , dateofbirth:string, address:string , isadmin:boolean){
    console.log(dateofbirth)
    const hashedPassword = passwordHash.generate(password);
    const user_id = uuid
    var result;
    connection.query('INSERT INTO user VALUES(? , ? , ? , ? , ? , ? , ?)', [user_id, username , email , hashedPassword, dateofbirth, address , isadmin], (err, rows ,fields) => {
        if(err){
            return err

        }else{
            return err

        }
    })
    
}

function getUserPassword(email:string){
    let storedPassword:string;
    connection.query('SELECT PASSWORD FROM USER WHERE EMAIL = ?',[email], (err, rows, field) => {
        if(!err){
            return rows
        }
        return err 
    }) 
    return ""
}

export function loginUser(email : string , password : string){
    let storedPassword = getUserPassword(email)
    let access = passwordHash.verify(storedPassword , password)
    if(access){
        return true
    }
    return false
}