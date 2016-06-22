'use strict';

var grades = require('./studGrades.js');
grades.connectToDB();

var express = require('express');
var app = express();

var port = process.env.PORT || 3001;
app.use('/', express.static('./public'));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
	next();
});

app.get('/specific/:studeId', function (req, res) {
	grades.getStudGrade(req.params.studeId, function(result) {
		res.send(result);
	});
});

app.get('/excel', function (req, res) {
	grades.getAllExcellenceStudent(function(result) {
		res.send(result);
	});
});

app.get('/excel/:year', function (req, res) {
	grades.getExcellenceByYear(req.params.year, function(result) {
		res.send(result);
	});
});

app.get('*', function(req, res) {
	res.send("you must be more specific!!:<br>" +
			 "go to /excel to see all the good students<br>" +
			 "go to /excel/:year to see all good students from this particular year<br>" +
			 "go to /specific/:studentId to see specific student data");
});

app.listen(port);
console.log("listening on port " + port);


