import mysql from 'mysql'
require('dotenv').config()



export let connection = mysql.createConnection({
    host : process.env.DB_HOST,
    port: 3306,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect()

