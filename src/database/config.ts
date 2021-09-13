require('dotenv').config()
import { errorMonitor } from 'events';
import mysql from 'mysql2/promise'
import userModel from '../users/models/users.models';

class DatabaseConnection{
    db;
    constructor(){
        this.db = mysql.createConnection({
            host:process.env.DB_HOST,
            user : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB_NAME
        });
    }  


    run = async (sql:string) => {
        try {
            let [rows, fields] = await (await this.db).execute(sql);
            let parsedResult = JSON.parse(JSON.stringify(rows));
            return parsedResult;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
}

let db = new DatabaseConnection();

export default db;
