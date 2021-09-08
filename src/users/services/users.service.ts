import { connection } from "../../database/config";
import passwordHash from 'password-hash'
import { stringify } from "querystring";

connection.connect()


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
    const hashedPassword = passwordHash.generate(password);
    connection.query('INSERT INTO USER VALUES(? , ? , ? , ? , ? , ?', [username , email , hashedPassword, dateofbirth, address , isadmin], (err, rows ,fields) => {
        if(!err){
            return true
        }
        return false
    })
    return false 
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