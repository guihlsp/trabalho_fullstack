const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "123456",
    database:"bebidas_db" 
})

module.exports = db;
