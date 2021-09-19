import {db} from '../../database/config';
import { createUser } from '../types/users.types';
import passwordHash from 'password-hash';
import { RowDataPacket } from 'mysql2';

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
        if(!result){
            return true;
        }
        return false;
    }

    checkEmail = async(email:string):Promise<Boolean> => {
        const sql = `
        SELECT * FROM ${this.tableName} WHERE email = "${email}"
        `;
        const result : any = await db.run(sql);
        if (result.length != 0){
            return true;
        }
        return false;
    }

    findOne = async (email : string):Promise<[]>  => {
        // TO remove checkEMail 
        const sql = `
        SELECT * FROM ${this.tableName} WHERE email = "${email}"
            `
        const result:any = await db.run(sql);
        return result;
        
    }

    findOneFromId = async (id:number)  => {
        const sql = 
        `
        SELECT username , email , date_of_birth, address, department_name FROM user INNER JOIN department ON user.department_id=department.id WHERE user.id=${id}
        `
        const result:any = await db.run(sql)
        return result
    }
    
    findAll = async () : Promise<Object|[]> =>{
        const sql = `
        SELECT user.id , username, email, date_of_birth, address, department_name FROM ${this.tableName} INNER JOIN department ON 
        ${this.tableName}.department_id=department.id
        `;
        const result : any= await db.run(sql);
        return result;
    }

    updateDept = async(department_id:number) : Promise<Boolean> => {
        const sql = 
        `
        UPDATE ${this.tableName} set department_id=${department_id}
        `
        const result : any = db.run(sql)
        if(result != false){
            return true
        }
        return false
    }
}

export let userModel = new UserModel();
