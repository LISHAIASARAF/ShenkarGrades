'use strict';
var studs = require('./student');
var mongoose = require('mongoose');

var fs = require('fs');

class CollegeGrades {
	constructor(name) {
		this.name = name;
		this.student = mongoose.model('Students', studs);
	}
	
	connectToDB() {
		mongoose.connect("mongodb://orbenda1905:orbenda1905@ds023500.mlab.com:23500/grades1905");
		this.conn = mongoose.connection;
		this.conn.on('error', function(err) {
			console.log('connection error ' + err);
		});
		this.conn.once('open', function() {
			console.log('connection established!!');
		});
	}

	getAllExcellenceStudent(res) {
		var query = studs.find();
		query.where('grade').gt(94);
		query.sort('year');
		query.select('-_id');//excluding the _id automatic field
		query.exec(function(err, result) {
			if (err) {
				console.log('could not for excells\n');
				res.send(JSON.stringify({error: "failed seeking excellent"}));
			} else {
				console.log('the excell students are:\n' + result + '\n');
				//return JSON.stringify(result);
				res.send(JSON.stringify(result));
			}
		});
	}

	getStudGrade(id, res) {
		var query = studs.find();
		query.where('id', id).select('-_id');
		query.exec(function(err, result) {
			if (err) {
				console.log('could not seek specified id\n');
				res.send(JSON.stringify({error: 'failed seeking id'}));
			} else {
				console.log('the specified stud is:\n' + result + '\n');
				res.send(JSON.stringify(result));
			}
		});
	}

	getExcellenceByYear(year, res) {
		var query = studs.find();
		query.where('grade').gt(94);
		query.where('year', year);
		query.select('-_id');
		query.exec(function(err, result) {
			if (err) {
				console.log("could not seek for excells by year\n");
				res.send(JSON.stringify({error: "failed seeking excells by year"}));
			} else {
				console.log('excells students by of year ' + year + '\n' + result + '\n');
				res.send(JSON.stringify(result));
			}
		});
	}
}

module.exports = new CollegeGrades("Shenkar");
