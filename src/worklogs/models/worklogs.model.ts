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
        const result = await db.run(sql);
        if(result!=false){
            return true;
        }
        return false;
    }

    getAllUserTask = async(cookie:string) : Promise<[]>=> {
        const currentUserId = await usersService.getCurrentUserId(cookie);
        const sql = `
        SELECT * FROM ${this.tableName} INNER JOIN 
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
        SELECT * FROM ${this.tableName} INNER JOIN 
        user ON ${this.tableName}.user_id=user.id
        `;
        const result: any = await db.run(sql);
        if(result!=false){
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
        ${this.tableName}.id=feedback.id
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
        SELECT task_description , username FROM ${this.tableName} INNER JOIN
        user ON ${this.tableName}.user_id=user.id
        `;
        const result :any = await db.run(sql);
        if(result!=false){
            return result;  
        }
        return []
    }
    
    updateTask : updateTask= async({task_description, user_id}) : Promise<Boolean> => {
        // TODO
        return false;
    }
}

export let worklogsModel = new WorkLogsModel();