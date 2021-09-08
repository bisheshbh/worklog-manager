import mysql from 'mysql'
import  {config} from 'dotenv'

export let connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})