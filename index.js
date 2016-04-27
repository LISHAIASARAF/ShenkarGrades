'use strict';

var grades = require('./studGrades.js');

var express = require('express');
var app = express();

var port = process.env.PORT || 3001;

app.get('/specific/:studeId', function (req, res) {
	res.send(grades.getStudGrade(req.params.studeId));
});

app.get('/excel', function (req, res) {
	res.send(grades.getAllExcellenceStudent());
});

app.get('/excel/:year', function (req, res) {
	res.send(grades.getExcellenceByYear(req.params.year));
});

app.get('*', function(req, res) {
	res.send("you must be more specific!!:<br>" +
			 "go to /excel to see all the good students<br>" +
			 "go to /excel/:year to see all good students from this particular year<br>" +
			 "go to /specific/:studentId to see specific student data");
});

app.listen(port);
console.log("listening on port " + port);

