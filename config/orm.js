const connection = require('../config/connection.js');

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
    const arr = [];
    Object.keys(obj).map(function (key, index) {
        var value = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === 'string' && value.indexOf(' ') >= 0) {
                key = `'${value}'`;
            }
            // e.g. {sleepy: true} => ['sleepy=true']
            arr.push(`${key}=${value}`);
        }
    });
    return `${arr.toString()}`;
};

// Object for all our SQL statement functions.
const orm = {
    selectAll: function (table, cb) {
        const queryString = `SELECT * FROM ${table};`
        // console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function (table, col, val, cb) {
        let queryString = `INSERT INTO ${table} (${col}) VALUES ('${val}');`
        // console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    // An example of objColVals would be {name: panther, sleepy: true}
    updateOne: function (table, objColVals, condition, cb) {
        let queryString = `
        UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition};`
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    delete: function (table, condition, cb) {
        let queryString = `DELETE FROM ?? WHERE ${condition};`
        console.log(queryString);
        connection.query(queryString, table, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
};

// Export the orm object for the model (cat.js).
module.exports = orm;