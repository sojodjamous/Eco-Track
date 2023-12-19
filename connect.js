import mysql from "mysql2"


export const db = mysql.createConnection({
    host: 'localhost',
    database:'Eco_Track',
    user : 'root',
    password : ''
})