import { RowDataPacket } from 'mysql2';
import {db} from '../../database/config';
import { usersService } from '../../users/services/users.service';
import {createTask, updateTask, UpdateWorklog} from '../types/worklogs.types';

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
        const result: any = await db.run(sql);
        if(result!=false){
            return result;
        }
        return [];
    }

    getAllTask = async() : Promise<[]> => {
        const sql = `
        SELECT task.id,task_description,created_date,username FROM ${this.tableName} INNER JOIN 
        user ON ${this.tableName}.user_id=user.id
        `;
        const result: any = await db.run(sql);
        if(result!=false){
            console.log(result)
            return result;
        }
        return [];
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
        const result:any = await db.run(sql);
        if(result!=false){
            return result;
        }
        return [];
    }

    getTaskById = async(task_id:number) => {
        const sql = 
        `
        SELECT task.id, task_description , username, created_date FROM ${this.tableName} INNER JOIN
        user ON ${this.tableName}.user_id=user.id
        WHERE ${this.tableName}.id=${task_id}
        `;
        const result :any = await db.run(sql);
        if(result!=false){
            return result;  
        }
        return []
    }
    
    updateTask = async(task_description:string, created_date:string ,task_id:string) : Promise<Boolean> => {
        const sql = 
        `
        UPDATE ${this.tableName} SET task_description="${task_description}" WHERE ${this.tableName}.id=${task_id}
        `
        const result: any = await db.run(sql)
        if(result != false){
            return true
        }
        return false
    }
}

export let worklogsModel = new WorkLogsModel();