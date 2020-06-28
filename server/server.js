const express = require("express");
const bodyParser = require("body-parser");
//const Employee = require('./db/employee.js');
const path = require('path');

//TODO : use app.router
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/pages', express.static('pages', {root: __dirname}));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/css', express.static(path.join(__dirname, 'css')));

const employees = require('./routes/employees')(app);

/* REST uri */
const URI_GET_EMPLOYEES = '/employees';

/* routing uri */
const URI_DEFAULT = '/';
const URI_SHOW_EMPLOYEES = '/showEmployees';
const URI_ADD_EMPLOYEE = '/showAddEmployee';


const port = 8000;
app.listen(port, function() {
    console.log("Server is successfully started on PORT: " + port);
});


/*
app.post('/employees', function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var nickName = req.body.nickName || firstName;
    var phoneNumber = req.body.phoneNumber;
    var checkRate = req.body.checkRate;
    var payRate = req.body.payRate;
    console.log("Insert employee: " + firstName + " " + lastName + " (" + nickName + ") " + phoneNumber + " " + checkRate + "," + payRate);

    //TODO : handle error case in res.send(result)
    Employee.insert(firstName, lastName, nickName, phoneNumber, checkRate, payRate, function(result) {
        res.sendFile('pages/showEmployees.html', {root: __dirname});
    });
});

app.delete('/employees', function(req, res) {
    var employeeId = req.body.employeeId;
    Employee.delete(employeeId, function(result) {
        res.send(result);
    });
});

app.get(URI_GET_EMPLOYEES, function(req, res) {
    Employee.getAll(function(result) {
        //console.log('Employees: ' + JSON.stringify(result));
        res.send(result);
    });
});

app.get([URI_DEFAULT, URI_SHOW_EMPLOYEES], function(req, res) {
    res.sendFile('pages/showEmployees.html', {root: __dirname});
});

app.get([URI_DEFAULT, URI_ADD_EMPLOYEE], function(req, res) {
    res.sendFile('pages/addEmployee.html', {root: __dirname});
});
*/
