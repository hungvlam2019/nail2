module.exports = function(app) {

    const employee = require('../db/employee.js');

    app.post('/employees', function(req, res) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var nickName = req.body.nickName || firstName;
        var phoneNumber = req.body.phoneNumber;
        var checkRate = req.body.checkRate;
        var payRate = req.body.payRate;
        console.log("Insert employee: " + firstName + " " + lastName + " (" + nickName + ") " + phoneNumber + " " + checkRate + "," + payRate);
    
        //TODO : handle error case in res.send(result)
        employee.insert(firstName, lastName, nickName, phoneNumber, checkRate, payRate, function(result) {
            //res.sendFile('pages/showEmployees.html', {root: __dirname});
            res.send(result);
        });
    });

    app.put('/employees/:id', (req, res) => {
        var employeeId = parseInt(req.params.id);
        employee.get(employeeId, (result) => {
            console.log('PUT: ' + employeeId + ' : ' + JSON.stringify(result));
            console.log('PUT: ' + employeeId + ' <> ' + result.id);
            if (result && result.id === employeeId) {
                console.log('Ready to update employee: ' + employeeId);
                var firstName = req.body.firstName;
                var lastName = req.body.lastName;
                var nickName = req.body.nickName || firstName;
                var phoneNumber = req.body.phoneNumber;
                var checkRate = req.body.checkRate;
                var payRate = req.body.payRate;
                employee.update(employeeId, firstName, lastName, nickName, phoneNumber, checkRate, payRate, (result) => {
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
        });
    });

    app.delete('/employees/:id', function(req, res) {
        var employeeId = parseInt(req.params.id);
        employee.delete(employeeId, function(result) {
            res.send(result);
        });
    });
}