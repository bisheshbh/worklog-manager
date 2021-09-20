import { Result } from 'express-validator';
import { RowDataPacket } from 'mysql2';
import {db} from '../../database/config';
import { usersService } from '../../users/services/users.service';

class WorkLogsModel {
    tableName = 'task';

    create  = async(task_description:string , created_date:string , user_id:string) : Promise<Boolean>=> {
        let is_edited = 0
        const sql = `
        INSERT INTO ${this.tableName} 
        (task_description , created_date , is_edited, user_id) VALUES ("${task_description}", "${created_date}", ${is_edited}, ${user_id})
        `; 
        try{
            await db.run(sql);
        }catch(error){
            throw error;
        }
        return false
    }

    getAllUserTask = async(cookie:string) : Promise<[]>=> {
        const currentUserId = await usersService.getCurrentUserId(cookie);
        const sql = `
        SELECT task.id, task_description, created_date FROM ${this.tableName} INNER JOIN 
        user ON ${this.tableName}.user_id=user.id
        WHERE ${this.tableName}.user_id=${currentUserId}`;
        try{
            const result: any = await db.run(sql);
            return result;
        }catch(error){
            throw error;
        }
    }

    getAllTask = async() : Promise<[]> => {
        const sql = `
        SELECT task.id,task_description,created_date,username FROM ${this.tableName} INNER JOIN 
        user ON ${this.tableName}.user_id=user.id
        `;
        try {
            const result: any = await db.run(sql);
            return result;
        } catch (error) {
            throw error;
        }   
    }

    getAllUserFeedback = async(cookie:string): Promise<[]> => {
        const currentUserId = await usersService.getCurrentUserId(cookie);
        const sql = 
        `
        SELECT task_description, comment, feedback.id, 
        feedback.created_date FROM ${this.tableName} 
        INNER JOIN user
        ON ${this.tableName}.user_id=user.id INNER JOIN 
        feedback ON 
        ${this.tableName}.id=feedback.task_id
        WHERE ${this.tableName}.user_id=${currentUserId}`;
        try {
            const result:any = await db.run(sql);
            return result;
        } catch (error) {
            throw error;
        }
    }

    getTaskById = async(task_id:number) => {
        const sql = 
        `
        SELECT task.id, task_description , username, created_date FROM ${this.tableName} INNER JOIN
        user ON ${this.tableName}.user_id=user.id
        WHERE ${this.tableName}.id=${task_id}
        `;
        try {
            const result:any = await db.run(sql)
            return result;
        } catch (error) {
            throw error;
        }
    }
    
    updateTask = async(task_description:string, created_date:string ,task_id:string) => {
        const sql = 
        `
        UPDATE ${this.tableName} SET task_description="${task_description}" WHERE ${this.tableName}.id=${task_id}
        `
        try {
            await db.run(sql);
        } catch (error) {
            throw error;
        }
    }

    filterTaskByDate = async(date:string, cookie:string, singleUser:boolean) : Promise<[]>=> {
        const currentUserId = await usersService.getCurrentUserId(cookie);
        const sqlCurrentUser:string = 
        `
        SELECT task.id, task_description , username, created_date FROM ${this.tableName} INNER JOIN
        user ON ${this.tableName}.user_id=user.id WHERE task.created_date="${date}" AND task.user_id=${currentUserId}
        `
        const sqlAllUser = 
        `
        SELECT task.id, task_description , username, created_date FROM ${this.tableName} INNER JOIN
        user ON ${this.tableName}.user_id=user.id WHERE task.created_date="${date}"
        `
        const sql = singleUser ? sqlCurrentUser : sqlAllUser;
        try{
            const result : any = db.run(sql)
            return result;
        }catch(error){
            throw error;
        }
    }

    filterTaskByDepartment = async(department_id:number)=>{
        const sql = 
        `
        SELECT task.id, task_description , username, created_date FROM ${this.tableName} INNER JOIN 
        user ON ${this.tableName}.user_id=user.id
        INNER JOIN department ON user.department_id=department.id
        WHERE department.id=${department_id}
        `
        try{
            const result : any = db.run(sql);
            return result;
        }catch(error){
            throw error;
        }
    }

    deleteFeedback = async(task_id:number) => {
        const sql = 
        `DELETE FROM feedback WHERE task_id=${task_id}`
        try {
            await db.run(sql);
        } catch (error) {
            throw error
        }
    }

    deleteTask = async(task_id:number) => {
        const sql = 
        `DELETE FROM ${this.tableName} WHERE id=${task_id}`

        try {
            await this.deleteFeedback(task_id)
            await db.run(sql);
        } catch (error) {
            throw error;
        }
    }
}

export let worklogsModel = new WorkLogsModel();