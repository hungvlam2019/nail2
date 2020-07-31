const url = require('url');

module.exports = function(app, connection) {

    const service = require('../db/service.js')(connection);

    app.post('/services', function(req, res) {
        var employeeId = req.body.employeeId;
        var serviceDate = req.body.serviceDate;
        var charge = req.body.charge;
        var tip = req.body.tip || 0;
        var paymentType = req.body.paymentType;
        var paymentTracking = req.body.paymentTracking || -1;
        //console.log(`Insert service: ${employeeId} ${serviceDate} ${charge} ${tip} ${paymentType} ${paymentTracking}`);
    
        //TODO : handle error case in res.send(result)
        service.insert(employeeId, serviceDate, charge, tip, paymentType, paymentTracking, function(result) {
            res.send(result);
        });
    });

    app.put('/services/:id', (req, res) => {
        var serviceId = parseInt(req.params.id);
        service.get(serviceId, (result) => {
            if (result && result.id === serviceId) {
                console.log('Ready to update service: ' + serviceId);
                var employeeId = req.body.employeeId || result.employeeId;
                var serviceDate = req.body.serviceDate || result.serviceDate;
                var charge = req.body.charge || result.charge;
                var tip = req.body.tip || result.tip;
                var paymentType = req.body.paymentType || result.paymentType;
                var paymentTracking = req.body.paymentTracking || result.paymentTracking;
                service.update(serviceId, employeeId, serviceDate, charge, tip, paymentType, paymentTracking, (result) => {
                    res.send(result);
                });
            }
        });
    });

    app.delete('/services/:id', function(req, res) {
        var serviceId = parseInt(req.params.id);
        service.delete(seviceId, function(result) {
            res.send(result);
        });
    });

    app.get('/services', function(req, res) {
        var query = url.parse(req.url, true).query;
        var employeeId = query.employeeId;
        var serviceDate = query.serviceDate;
        var startDate = query.startDate;
        var endDate = query.endDate;
        if (employeeId) {
            if (serviceDate) {
                service.getServicesForEmployeeOn(employeeId, serviceDate, function(result) {
                    res.send(result);
                });
            } else if (startDate && endDate) {
                service.getServicesForEmployeeBetween(employeeId, startDate, endDate, function(result) {
                    res.send(result);
                });
            } else {
                service.getServicesForEmployeeThisYear(employeeId, function(result) {
                    res.send(result);
                })
            }
        } else if (serviceDate) {
            service.getServicesOn(serviceDate, function(result) {
                res.send(result);
            })
        } else if (startDate && endDate) {
            service.getServicesBetween(startDate, endDate, function(result) {
                res.send(result);
            })
        } else {
            service.getAll(function(result) {
                res.send(result);
            })
        }
    });

    app.get('/services/:id', function(req, res) {
        var serviceId = parseInt(req.params.id);
        service.get(serviceId, function(result) {
            res.send(result);
        });
    });

    app.get('/services/:employeeId/:serviceDate', function(req,res) {
        var employeeId = parseInt(req.params.employeeId);
        var serviceDate = req.params.serviceDate;
        console.log('employeeId: ' + employeeId + ' - serviceDate: ' + serviceDate);
        service.getTodayServiceForEmployee(employeeId, serviceDate, function(result) {
            res.send(result);
        });
    })

}