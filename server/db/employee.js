const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'nail'
});

connection.connect(function (err) {
    if (err)
        throw err;
    console.log("Connect to the database successfully");
});

module.exports = {

    insert: function (firstName, lastName, nickName, phoneNumber, checkRate = 0.6, payRate = 0.6, callback) {
        var sql = "INSERT INTO employee (firstName, lastName, nickName, phoneNumber, checkRate, payRate) VALUES (?, ?, ?, ?, ?, ?)";
        connection.query(sql, [firstName, lastName, nickName, phoneNumber, checkRate, payRate], function (err, result) {
            if (err)
                throw err;
            if (callback !== undefined)
                callback(result);
        });
    },

    update: function (employeeId, firstName, lastName, nickName, phoneNumber, checkRate, payRate, active, callback) {
        var sql = 'UPDATE employee SET firstName = ?, lastName = ?, nickName = ?, phoneNumber = ?, checkRate = ?, payRate = ?, active = ? WHERE id = ?';
        connection.query(sql, [firstName, lastName, nickName, phoneNumber, checkRate, payRate, active, employeeId], function (err, result) {
            if (err)
                throw err;
            if (callback !== undefined) {
                callback(result);
            }
        });
    },

    get: function (employeeId, callback) {
        var sql = 'SELECT id, firstName, lastName, nickName, phoneNumber, checkRate, payRate, active FROM employee WHERE id = "' + employeeId + '" LIMIT 1';
        connection.query(sql, employeeId, function (err, result) {
            if (err) {
                throw err;
            }
            if (callback !== undefined) {
                callback(result[0]);
            }
        });
    },

    getAll: function (callback) {
        var sql = 'SELECT id, firstName, lastName, nickName, phoneNumber, checkRate, payRate, active FROM employee';
        connection.query(sql, function (err, result) {
            if (!err) {
                callback(result);
            }
            else {
                //TODO - need to pass error response to client
                console.log(err);
                throw err;
            }
        });
    },

    delete: function (employeeId, callback) {
        var sql = 'DELETE FROM employee WHERE id = "' + employeeId + '"';
        console.log('Delete: ' + sql);
        connection.query(sql, employeeId, function (err, result) {
            if (err)
                throw err;
            if (callback !== undefined) {
                callback(result);
            }
        });
    }
}