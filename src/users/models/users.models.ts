import {db} from '../../database/config';
import { createUser, User } from '../types/users.types';
import passwordHash from 'password-hash';
import { RowDataPacket } from 'mysql2';
import { usersService } from '../services/users.service';

class UserModel {
    tableName : string = 'user';

    create : createUser  = async ({username , email , password , date_of_birth , address , isAdmin=0, department}) => {
        const hashedPassword = passwordHash.generate(password);
        const sql = 
        `INSERT INTO ${this.tableName} 
        (username , email , password , date_of_birth, 
        address, is_admin, department_id)
        VALUES("${username}","${email}","${hashedPassword}",
        "${date_of_birth}",
        "${address}",${isAdmin}, ${department})
        `;
        try {
            await db.run(sql);
        } catch (error) {
            throw error;
        }
    }

    getOne = async (email : string):Promise<[]>  => {
        const sql = `
        SELECT * FROM ${this.tableName} WHERE email = "${email}"
            `
        const result:any = await db.run(sql);
        return result;
        
    }

    getOneFromId = async (id:number)  => {
        const sql = 
        `
        SELECT username , email , date_of_birth, address, 
        department_name, is_admin FROM user INNER JOIN department 
        ON user.department_id=department.id WHERE user.id=${id}
        `
        const result: any = await db.run(sql);
        return result;
    }
    
    getAll = async () : Promise<Object|[]> =>{
        const sql = `
        SELECT user.id , username, email, date_of_birth, address, 
        department_name FROM ${this.tableName} INNER JOIN 
        department ON ${this.tableName}.department_id=department.id
        `;
        const result : object|[]= await db.run(sql);
        return result;
    }

    updateDept = async(department_id:number , user_id:number) : Promise<Boolean> => {
        const sql = 
        `
        UPDATE ${this.tableName} set department_id=${department_id}
        WHERE id=${user_id}
        `
        try{
            await db.run(sql);
        }
        catch(err){
            throw err;
        }
        return false;
    }

    updatePassword = async(cookie:string , oldPassword:string, newPassword:string) : Promise<Boolean> => {
        let hashedPassword:string = ''
        const userId : number = await usersService.getCurrentUserId(cookie);
        const user : User[] = await this.getOneFromId(userId);
        const email : string = user[0].email;
        if(await usersService.match(email , oldPassword)){
            hashedPassword = passwordHash.generate(newPassword);
            const sql = 
            `
            UPDATE ${this.tableName} SET password="${hashedPassword}" WHERE email = "${email}"
            `
            try {
                await db.run(sql);
                return true;
            } catch (error) {
                throw error;
            }
        }
        return false;
    }

    updateUser = async(user_id:number, username:string , email:string, admin:number) => {
        const sql = 
        `UPDATE ${this.tableName} SET username="${username}",
        email="${email}", is_admin=${admin} WHERE id=${user_id}`
        try {
            await db.run(sql);
        } catch (error) {
            throw error;
        }
    }
}

export let userModel = new UserModel();
