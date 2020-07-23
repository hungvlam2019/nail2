module.exports = function(connection) {

    var module = {}

    module.insert = function (employeeId, serviceDate, charge, tip, paymentAmount, paymentType, paymentTracking = -1, callback) {
        var sql = "INSERT INTO service (employeeId, serviceDate, charge, tip, paymentAmount, paymentType, paymentTracking) VALUES (?, ?, ?, ?, ?, ?, ?)";
        //var utcDate = new Date(new Date(serviceDate).toUTCString());
        connection.query(sql, [employeeId, serviceDate, charge, tip, paymentAmount, paymentType, paymentTracking], function (err, result) {
            if (err)
                throw err;
            if (callback !== undefined)
                callback(result);
        });
    },

    module.update = function (serviceId, employeeId, serviceDate, charge, tip, paymentAmount, paymentType, paymentTracking = -1, callback) {
        var sql = 'UPDATE service SET employeeId = ?, serviceDate = ?, charge = ?, tip = ?, paymentAmount = ?, paymentType = ?, paymentTracking = ? WHERE id = ?';
        connection.query(sql, [employeeId, serviceDate, charge, tip, paymentAmount, paymentType, paymentTracking, serviceId], function (err, result) {
            if (err)
                throw err;
            if (callback !== undefined) {
                callback(result);
            }
        });
    },

    module.delete = function (serviceId, callback) {
        var sql = 'DELETE FROM service WHERE id = "' + serviceId + '"';
        connection.query(sql, serviceId, function (err, result) {
            if (err)
                throw err;
            if (callback !== undefined) {
                callback(result);
            }
        });
    }

    module.get = function (serviceId, callback) {
        var sql = 'SELECT id, employeeId, serviceDate, charge, tip, paymentAmount, paymentType, paymentTracking FROM service WHERE id = "' + serviceId + '" LIMIT 1';
        connection.query(sql, serviceId, function (err, result) {
            if (err) {
                throw err;
            }
            if (callback !== undefined) {
                callback(result[0]);
            }
        });
    },

    module.getAll = function (callback) {
        var sql = 'SELECT id, employeeId, serviceDate, charge, tip, paymentAmount, paymentType, paymentTracking FROM service ORDER BY serviceDate ASC';
        connection.query(sql, function (err, result) {
            if (!err) {
                console.log(result);
                callback(result);
            }
            else {
                //TODO - need to pass error response to client
                console.log(err);
                throw err;
            }
        });
    },

    module.getTodayServiceForEmployee = function(employeeId, serviceDate, callback) {
        var start = serviceDate + 'T00:00:00.000Z';
        var end = serviceDate + 'T23:59:59.000Z';
        var sql = 'SELECT id, employeeId, serviceDate, charge, tip, paymentAmount, paymenttype, paymentTracking FROM service WHERE employeeId = ' + employeeId + ' AND serviceDate BETWEEN \'' + start + '\' AND \'' + end + '\'';
        console.log('sql: ' + sql);
        connection.query(sql, function (err, result) {
            if (!err) {
                console.log(result);
                callback(result);
            }
            else {
                //TODO - need to pass error response to client
                console.log(err);
                throw err;
            }
        });
    }

    return module;
}