const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');

//TODO : use app.router
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/pages', express.static('pages', {root: __dirname}));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/css', express.static(path.join(__dirname, 'css')));

const port = 8000;
app.listen(port, function() {
    console.log("Server is successfully started on PORT: " + port);
});

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

const employees = require('./routes/employees')(app, connection);
const services = require('./routes/services')(app, connection);

app.get(['/', '/showEmployees'], function(req, res) {
    console.log('get showEmployees');
    res.sendFile('pages/showEmployees.html', {root: __dirname});
});

app.get('/addEmployee', function(req, res) {
    res.sendFile('pages/addEmployee.html', {root: __dirname});
});

app.get('/updateEmployee/:id', function(req,res) {
    var employeeId = parseInt(req.params.id);
    console.log('update employee id: ' + employeeId);
    var filePath = path.join(__dirname, 'pages/updateEmployee.html');
    fs.readFile(filePath, function(err, data) {
        if (err) {
            throw err;
        }

        var content = data.toString();
        content = content.replace(/{{EMPLOYEE_ID}}/g, employeeId);
        res.send(content);
    });
});


