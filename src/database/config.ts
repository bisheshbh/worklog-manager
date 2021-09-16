require('dotenv').config();
import { MysqlError } from 'mysql';
import mysql from 'mysql2/promise';

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
            return rows;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export let db = new DatabaseConnection();

