import {db} from '../../database/config';

class AdminModel { 
    tableName = 'feedback';

    createFeedback = async(task_description:string, created_date:string, task_id:number):Promise<Boolean>=>{
        const sql = 
        `
        INSERT INTO ${this.tableName} (comment, created_date, task_id) VALUES("${task_description}", "${created_date}", ${task_id})
        `;
        const result : any = await db.run(sql);
        if(result != false){
            return true;
        }
        return false;
    }

    getAllFeedback = async() : Promise<[]>=> {
        const sql = 
        `
        SELECT comment , feedback.created_date, task_description FROM feedback INNER JOIN task ON feedback.task_id=task.id
        `;
        const result : any = await db.run(sql)
        return result;
    }
}

export let adminModel = new AdminModel()