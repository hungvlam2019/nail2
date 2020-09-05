module.exports = function(connection) {

    function tripTimeFromDateTime(value) {
        return value.split(' ')[0];
    }
    
    var module = {}

    module.insert = function (employeeId, serviceDate, charge, tip, paymentType, paymentTracking = -1, callback) {
        var sql = "INSERT INTO service (employeeId, serviceDate, charge, tip, paymentType, paymentTracking) VALUES (?, ?, ?, ?, ?, ?)";
        connection.query(sql, [employeeId, serviceDate, charge, tip, paymentType, paymentTracking], function (err, result) {
            if (err)
                throw err;
            if (callback !== undefined)
                callback(result);
        });
    },

    module.update = function (serviceId, employeeId, serviceDate, charge, tip, paymentType, paymentTracking = -1, callback) {
        var sql = 'UPDATE service SET employeeId = ?, serviceDate = ?, charge = ?, tip = ?, paymentType = ?, paymentTracking = ? WHERE id = ?';
        connection.query(sql, [employeeId, serviceDate, charge, tip, paymentType, paymentTracking, serviceId], function (err, result) {
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
        var sql = 'SELECT id, employeeId, serviceDate, charge, tip, paymentType, paymentTracking FROM service WHERE id = "' + serviceId + '" LIMIT 1';
        connection.query(sql, serviceId, function (err, result) {
            if (err) {
                throw err;
            }
            if (callback !== undefined) {
                callback(result[0]);
            }
        });
    },

    module.getAll = function(callback) {
        var sql = 'SELECT id, employeeId, serviceDate, charge, tip, paymentType, paymentTracking FROM service ORDER BY serviceDate ASC';
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

    module.getServicesForEmployeeOn = function(employeeId, serviceDate, callback) {
        serviceDate = tripTimeFromDateTime(serviceDate);
        var start = serviceDate + 'T00:00:00.000Z';
        var end = serviceDate + 'T23:59:59.000Z';
        var sql = 'SELECT id, employeeId, serviceDate, charge, tip, paymenttype, paymentTracking FROM service WHERE employeeId = ' + employeeId + ' AND serviceDate BETWEEN \'' + start + '\' AND \'' + end + '\'';
        console.log('getServicesForEmployeeOn.sql: ' + sql);
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

    module.getServicesForEmployeeBetween = function(employeeId, startDate, endDate, callback) {
        startDate = tripTimeFromDateTime(startDate);
        endDate = tripTimeFromDateTime(endDate);
        var start = startDate + 'T00:00:00.000Z';
        var end = endDate + 'T23:59:59.000Z';
        var sql = 'SELECT id, employeeId, serviceDate, charge, tip, paymenttype, paymentTracking FROM service WHERE employeeId = ' + employeeId + ' AND serviceDate BETWEEN \'' + start + '\' AND \'' + end + '\'';
        console.log('sql: ' + sql);
        connection.query(sql, function(err, result) {
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

    module.getServicesForEmployeeThisYear = function(employeeId, callback) {
        var currentYear = new Date().getUTCFullYear();
        var start = currentYear + '-01-01T00:00:00.000Z';
        var end = currentYear + '-12-31T23:59:59.000Z';
        var sql = 'SELECT id, employeeId, serviceDate, charge, tip, paymenttype, paymentTracking FROM service WHERE employeeId = ' + employeeId + ' AND serviceDate BETWEEN \'' + start + '\' AND \'' + end + '\'';
        console.log('sql: ' + sql);
        connection.query(sql, function(err, result) {
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

    module.getServicesOn = function(serviceDate, callback) {
        var start = serviceDate + 'T00:00:00.000Z';
        var end = serviceDate + 'T23:59:59.000Z';
        var sql = 'SELECT id, employeeId, serviceDate, charge, tip, paymenttype, paymentTracking FROM service WHERE serviceDate BETWEEN \'' + start + '\' AND \'' + end + '\'';
        console.log('sql: ' + sql);
        connection.query(sql, function(err, result) {
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

    module.getServicesBetween = function(startDate, endDate, callback) {
        startDate = tripTimeFromDateTime(startDate);
        endDate = tripTimeFromDateTime(endDate);
        var start = startDate + 'T00:00:00.000Z';
        var end = endDate + 'T23:59:59.000Z';
        var sql = 'SELECT id, employeeId, serviceDate, charge, tip, paymenttype, paymentTracking FROM service WHERE serviceDate BETWEEN \'' + start + '\' AND \'' + end + '\'';
        console.log('sql: ' + sql);
        connection.query(sql, function(err, result) {
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