import {db} from "../../database/config";
import { departments } from "../data/department";

class DepartmentModel {

    tableName = 'department'
    insertData= async() => {
         departments.names.map(async (department)=>{
            const sql = `INSERT INTO ${this.tableName} 
            (department_name) VALUES 
            ("${department}")`
            try{
                await db.run(sql);
            }catch(e){
                throw e;
            }
        })
        }

    getDepartmentData = async() =>{
        const sql = `SELECT * FROM ${this.tableName}`
        const result : any = await db.run(sql);
        return result
    }

}

export let departmentModel = new DepartmentModel();
