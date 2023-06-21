const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "piedade321",
    database:"bebidas_db" 
})

module.exports = db;
