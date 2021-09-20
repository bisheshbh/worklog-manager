import { RowDataPacket } from 'mysql2';
import {db} from '../../database/config';
import { User } from '../../users/types/users.types';

class AdminModel { 
    tableName = 'feedback';

    createFeedback = async(task_description:string, created_date:string, task_id:number)=>{
        const sql = 
        `
        INSERT INTO ${this.tableName} (comment, created_date, task_id) VALUES("${task_description}", "${created_date}", ${task_id})
        `;
        try {
            await db.run(sql);
        } catch (error) {
            throw error;
        }
    }

    getAllFeedback = async() : Promise<[]>=> {
        const sql = 
        `
        SELECT comment , feedback.created_date, 
        task_description FROM feedback INNER JOIN 
        task ON feedback.task_id=task.id
        `;
        const result : any = await db.run(sql);
        return result;
    }
}

export let adminModel = new AdminModel();