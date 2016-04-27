'use strict';
var fs = require('fs');

class CollegeGrades {
	constructor(name) {
		this.name = name;
	}

	getAllExcellenceStudent() {
		//var data = require('./data/grades.json');
		var data = JSON.parse(fs.readFileSync('./data/grades.json', 'utf-8'));
		var students = [];
		for (var i in data) {
			if (data[i].grade >= 95) {
				students.push(data[i]);
			}
		}
		if (students.length === 0) students = {error: "no students with grade of 95 and above"}
		return JSON.stringify(students, null , 4);
	}

	getStudGrade(id) {//gives the student's grade (by id)
		var data = JSON.parse(fs.readFileSync('./data/grades.json', 'utf-8'));
		for (var i in data) {
			if (data[i].id == id) {
				return JSON.stringify(data[i], null, 4);
			}
		}
		return JSON.stringify({error: "no result"});
	}

	getExcellenceByYear(year) {
		var data = JSON.parse(fs.readFileSync('./data/grades.json', 'utf-8'));
		var obj = {students: []};
		for (var i in data) {
				if (data[i].grade >= 95 && data[i].year >= year) {
					obj.students.push(data[i]);
				}
			}
		if (obj.students.length === 0) obj.students = {error: "no ecxel students in this year"};
		return JSON.stringify(obj.students, null, 4)
	}
}

module.exports = new CollegeGrades("Shenkar");
