module.exports = function(app) {

    const employee = require('../db/employee.js');

    app.post('/employees', function(req, res) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var nickName = req.body.nickName || firstName;
        var phoneNumber = req.body.phoneNumber;
        var checkRate = req.body.checkRate || 0.6;
        var payRate = req.body.payRate || 0.6;
        console.log("Insert employee: " + firstName + " " + lastName + " (" + nickName + ") " + phoneNumber + " " + checkRate + "," + payRate);
    
        //TODO : handle error case in res.send(result)
        employee.insert(firstName, lastName, nickName, phoneNumber, checkRate, payRate, function(result) {
            res.send(result);
        });
    });

    app.put('/employees/:id', (req, res) => {
        var employeeId = parseInt(req.params.id);
        employee.get(employeeId, (result) => {
            console.log('PUT: ' + employeeId + ' : ' + req.body.payRate);
            if (result && result.id === employeeId) {
                console.log('Ready to update employee: ' + employeeId);
                var firstName = req.body.firstName || result.firstName;
                var lastName = req.body.lastName || result.lastName;
                var nickName = req.body.nickName || result.nickName;
                var phoneNumber = req.body.phoneNumber || result.phoneNumber;
                var checkRate = req.body.checkRate;
                if (checkRate === undefined || payRate === null) {
                    checkRate = result.checkRate;
                }
                var payRate = req.body.payRate;
                if (payRate === undefined || payRate === null) {
                    payRate = result.payRate;
                }
                var active = req.body.active || result.active;
                employee.update(employeeId, firstName, lastName, nickName, phoneNumber, checkRate, payRate, active, (result) => {
                    res.send(result);
                });
            }
        });
    });

    app.get('/employees', function(req, res) {
        employee.getAll(function(result) {
            //console.log('Employees: ' + JSON.stringify(result));
            res.send(result);
        });
    });

    app.get('/employees/:id', function(req, res) {
        var employeeId = parseInt(req.params.id);
        employee.get(employeeId, function(result) {
            //console.log('Employees: ' + JSON.stringify(result));
            res.send(result);
            console.log('get: ' + JSON.stringify(result));
        });
    });

    app.delete('/employees/:id', function(req, res) {
        var employeeId = parseInt(req.params.id);
        employee.delete(employeeId, function(result) {
            res.send(result);
        });
    });
}