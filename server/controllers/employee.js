var async = require('async');
var Employee = require('../models/Employee');
var EmployeeAsset = require('../models/EmployeeAsset');
var EmployeeDesk = require('../models/EmployeeDesk');

var employeeCtrl = {
	get: function(req, res) {
		Employee.find({}, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({"error": true, "message": err});
			}

			return res.status(200).json(data);
		});
	},

	save: function(req, res) {
		var employee = req.body.payload;
		
		var employeeObj = new Employee();
		employeeObj.EmployeeID = employee.EmployeeID;
		employeeObj.FirstName = employee.FirstName;
		employeeObj.LastName = employee.LastName;
		employeeObj.Stream = employee.Stream;
		employeeObj.Password = employee.EmployeeID+'@'+employee.LastName;
		employeeObj.Admin = employee.Admin;

		employeeObj.save(function(err) {
			if(err) {
				console.log(err);
				return res.status(500).json({"error": true, "message": err});
			}

			return res.status(200).json({"message": "Employee saved"});
		});
	},

	update: function(req, res) {
		var _employeeID = req.params.employeeID;
		var employee = req.body.payload;

		Employee.findById(_employeeID, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({"error": true, "message": err});
			}
			data.EmployeeID = employee.EmployeeID;
			data.FirstName = employee.FirstName;
			data.LastName = employee.LastName;
			data.Stream = employee.Stream;
			data.Admin = employee.Admin;
			data.Password = employee.EmployeeID+'@'+employee.LastName;
			data.save(function(err) {
				if(err) {
					console.log(err);
					return res.status(500).json({"error": true, "message": err});
				}

				return res.status(200).json({"message": "Employee updated"});
			});
		});
	},

	delete: function(req, res) {
		var _employeeID = req.params.employeeID;

		Employee.findById(_employeeID).remove(function(err) {
			if(err) {
				console.log(err);
				return res.status(500).json({"error": true, "message": err});
			}
			return res.status(200).json({"message": "Employee removed"});
		});
	},

	getData: function(req, res) {

		var employeeID = req.params.employeeID;

		async.parallel({
				desk: function(callback) {
					EmployeeDesk.find({EmployeeID: employeeID})
											.populate('DeskNo')
											.exec(function(err, data) {
						if(err) {
							console.log(err);
							callback(err, null);
							return;
						}
						callback(null, data);
					})
				},
				assets: function(callback) {
					EmployeeAsset.find({EmployeeID: employeeID}, function(err, data) {
						if(err) {
							console.log(err);
							callback(err, null);
							return;
						}
						callback(null, data);
					})
				}
			},
			function(err, results) {
				if(err) {
					return res.status(500).json({"error": true, "message": err});
				}
				res.status(200).json(results);
			}
		)
	}
} 


module.exports = employeeCtrl;