import {db} from '../database/config';
import { departmentModel } from '../department/models/department.models';

class CreateTable {
    userTable: string;
    departmentTable : string;
    taskTable : string;
    feedbackTable : string
    constructor(){
        this.departmentTable = `CREATE TABLE IF NOT EXISTS department(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            department_name VARCHAR(25)
        )`
        this.userTable = `CREATE TABLE IF NOT EXISTS user(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            username VARCHAR(25),
            email VARCHAR(150),
            password VARCHAR(100),
            date_of_birth VARCHAR(25),
            address VARCHAR(25),
            is_admin BOOLEAN,
            department_id int,
            FOREIGN KEY (department_id) REFERENCES department(id)
        )`
        this.taskTable = `CREATE TABLE IF NOT EXISTS task(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            task_description VARCHAR(2000),
            created_date VARCHAR(25),
            is_edited BOOLEAN,
            user_id int, 
            FOREIGN KEY (user_id) REFERENCES user(id)
        )`
        this.feedbackTable = `CREATE TABLE IF NOT EXISTS feedback(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            comment VARCHAR(450),
            created_date VARCHAR(25),
            task_id INT,
            user_id INT,
            FOREIGN KEY (task_id) REFERENCES task(id),
            FOREIGN KEY (user_id) REFERENCES user(id)
        )`
    }

    async createTable(){
        try {
            await db.run(this.departmentTable);
            await db.run(this.userTable);
            await db.run(this.taskTable);
            await db.run(this.feedbackTable);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

export let createTable = new CreateTable();
createTable.createTable()
departmentModel.insertData()
