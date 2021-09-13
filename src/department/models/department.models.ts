import db from "../../database/config";
import { departments } from "../data/department.data";

class Department {

    tableName = 'department'
    insertData= async() => {
         departments.names.map(async (department)=>{
            const sql = `INSERT INTO ${this.tableName} (department_name) VALUES ("${department}")`
            try{
                await db.run(sql);
            }catch(e){
                console.log(e)
                return 
            }
        })
        }

    getDepartmentData = async() =>{
        const sql = `SELECT * FROM ${this.tableName}`
        const result : any = await db.run(sql);
        return result
    }

}

let department = new Department();
export default department;