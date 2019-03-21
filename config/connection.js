// Set up MySQL connection.
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'mysql://b4e3a6737e77f4:aefa17dc@us-cdbr-iron-east-03.cleardb.net/heroku_cdf4f3fe690dc7f?reconnect=true',
    port: 3306,
    user: 'b4e3a6737e77f4',
    password: 'aefa17dc',
    database: 'burgers_db'
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
