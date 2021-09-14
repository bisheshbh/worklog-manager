import {db} from '../../database/config'
import {departmentModel} from '../../department/models/department.models';
import { createUser } from '../types/users.types';
import passwordHash from 'password-hash'

class UserModel {
    tableName : string = 'user';

    create : createUser  = async ({username , email , password , date_of_birth , address , isAdmin=0, department}) : Promise<boolean>=> {
        const hashedPassword = passwordHash.generate(password);
        const sql = 
        `INSERT INTO ${this.tableName} 
        (username , email , password , date_of_birth, 
        address, is_admin, department_id)VALUES("${username}","${email}","${hashedPassword}","${date_of_birth}",
        "${address}",${isAdmin}, ${department})
        `;
        const result = await db.run(sql);
        console.log(result)
        if(result != false){
            return true
        }
        return false
        
    }

    checkEmail = async(email:string):Promise<Boolean> => {
        const sql = `
        SELECT * FROM ${this.tableName} WHERE email = "${email}"
        `
        const result : any = await db.run(sql)
        if (result.length != 0){
            return true
        }
        return false
    }

    findOne = async (email : string):Promise<[]>  => {
        if(this.checkEmail(email)){
            const sql = `
            SELECT * FROM ${this.tableName} WHERE email = "${email}"
            `
            const result :any = await db.run(sql)
            return result
        }
        return []
        
    }
    
    findAll = async (email:string) : Promise<Object|[]> =>{
        const sql = `
        SELECT * FROM ${this.tableName}
        `
        const result : any= await db.run(sql)
        return result
    }
}

export let userModel = new UserModel()
