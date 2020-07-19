module.exports = function(connection) {

    var module = {}

    module.insert = function (firstName, lastName, nickName, phoneNumber, checkRate = 0.6, payRate = 0.6, callback) {
        var sql = "INSERT INTO employee (firstName, lastName, nickName, phoneNumber, checkRate, payRate) VALUES (?, ?, ?, ?, ?, ?)";
        connection.query(sql, [firstName, lastName, nickName, phoneNumber, checkRate, payRate], function (err, result) {
            if (err)
                throw err;
            if (callback !== undefined)
                callback(result);
        });
    },

    module.update = function (employeeId, firstName, lastName, nickName, phoneNumber, checkRate, payRate, active, callback) {
        var sql = 'UPDATE employee SET firstName = ?, lastName = ?, nickName = ?, phoneNumber = ?, checkRate = ?, payRate = ?, active = ? WHERE id = ?';
        connection.query(sql, [firstName, lastName, nickName, phoneNumber, checkRate, payRate, active, employeeId], function (err, result) {
            if (err)
                throw err;
            if (callback !== undefined) {
                callback(result);
            }
        });
    },

    module.get = function (employeeId, callback) {
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

    module.getAll = function (callback) {
        var sql = 'SELECT id, firstName, lastName, nickName, phoneNumber, checkRate, payRate, active FROM employee ORDER BY nickName ASC';
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

    module.delete = function (employeeId, callback) {
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

    return module;
}