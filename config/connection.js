// Set up MySQL connection.
const mysql = require("mysql");
require('dotenv').config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USERNAME = process.env.DB_USERNAME || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'vivian';
const DB_DATABASE = process.env.DB_DATABASE || 'burgers_db'

const connection = mysql.createConnection({
    host: DB_HOST,
    port: 3306,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE
});

// Make connection.
connection.connect(err => {
    if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }
    console.log(`connected as id ${connection.threadId}`);
});

// Export connection for our ORM to use.
module.exports = connection;
