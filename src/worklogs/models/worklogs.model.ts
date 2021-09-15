import {db} from '../../database/config';
import { usersService } from '../../users/services/users.service';
import {createTask, updateTask, UpdateWorklog} from '../types/worklogs.types';

class WorkLogsModel {
    tableName = 'task';
    joinTables = ['user', 'feedback'];

    create  = async(task_description:string , created_date:string , user_id:string) : Promise<Boolean>=> {
        console.log("Hit")
        let is_edited = 0
        const sql = `
        INSERT INTO ${this.tableName} 
        (task_description , created_date , is_edited, user_id) VALUES ("${task_description}", "${created_date}", ${is_edited}, ${user_id})
        `; 
        const result = await db.run(sql);
        if(result != false){
            return true;
        }
        return false;
    }

    getAllTask = async(cookie:string) : Promise<[]>=> {
        const currentUserId = await usersService.getCurrentUserId(cookie);
        const sql = `
        SELECT * FROM ${this.tableName} INNER JOIN 
        ${this.joinTables[0]} ON ${this.tableName}.user_id=${this.joinTables[0]}.id
        WHERE ${this.tableName}.user_id=${currentUserId}`;
        const result: any = await db.run(sql);
        if(result != false){
            return result;
        }
        return [];

    }

    getAllFeedback = async(cookie:string): Promise<[]> => {
        const currentUserId = await usersService.getCurrentUserId(cookie);
        console.log(currentUserId)
        const sql = `
        SELECT task_description, comment, ${this.joinTables[1]}.id, ${this.joinTables[1]}.created_date FROM ${this.tableName} INNER JOIN ${this.joinTables[0]} 
        ON ${this.tableName}.user_id=${this.joinTables[0]}.id INNER JOIN 
        ${this.joinTables[1]} ON 
        ${this.tableName}.id=${this.joinTables[1]}.id
        WHERE ${this.tableName}.user_id=${currentUserId}`;
        console.log(sql);
        const result:any = await db.run(sql);
        if(result != false){
            return result;
        }
        return [];
    }

    updateTask : updateTask= async({task_description, user_id}) : Promise<Boolean> => {
        // TODO
        return false;
    }
}

export let worklogsModel = new WorkLogsModel();