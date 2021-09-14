import { RowDataPacket } from 'mysql2'
import {db} from '../../database/config'
import {createTask, updateTask, UpdateWorklog} from '../types/worklogs.types'

class WorkLogsModel {
    tableName = 'tasks'
    joinTables = ['user', 'feedback']

    create : createTask = async({task_description , created_date , is_edited=0 , user_id}) : Promise<Boolean>=> {
        const sql = `
        INSERT INTO ${this.tableName} 
        (task_description , created_date , is_edited, user_id) VALUES ("${task_description}", "${created_date}", ${is_edited}, ${user_id})
        `; 
        const result = await db.run(sql);
        if(result != false){
            return true
        }

        return false
    }

    getAllTask = async() : Promise<[]>=> {
        const sql = `
        SELECT * FROM ${this.tableName} INNER JOIN 
        ${this.joinTables[0]} ON ${this.tableName}.id=${this.joinTables[0]}.id
        `;
        const result: any = await db.run(sql);
        if(result != false){
            return result
        }
        return []

    }

    getAllFeedback = async() => {
        const sql = `
        SELECT * FROM ${this.tableName} INNER JOIN ${this.joinTables[0]} 
        ON ${this.tableName}.id=${this.joinTables[0]}.id INNER JOIN 
        ${this.joinTables[1]} ON 
        ${this.joinTables[0]}.id=${this.joinTables[1]}.id
        `;
        const result:any = await db.run(sql);
        if(result != 'false'){
            return result
        }
        return []
    }

    updateTask : updateTask= async({task_description, user_id}) : Promise<Boolean> => {
         
        return false;
    }
}

export let worklogsModel = new WorkLogsModel();