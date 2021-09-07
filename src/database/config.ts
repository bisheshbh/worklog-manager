import mysql from 'mysql'

export let connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database: 'worklog'
})