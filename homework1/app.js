//create person object
function Person(first, last, id, start) {
	this.firstName = first;
	this.lastName = last;
	this.loginID = id;
	this.startDate = new Date(start);
}
/* OOPS, I didn't understand what was happening, and so I made a whole class thing...
Person.prototype.getFirst = function() {
	return this.firstName;
}

Person.prototype.getLast = function() {
	return this.lastName;
}

Person.prototype.fullName = function() {
	return this.firstName + " " + this.lastName;
}

Person.prototype.getID = function() {
	return this.loginID;
}

Person.prototype.getYears = function() {
	var currentDate /= Date.now();
	return currentDate.getFullYear() - startDate;
}

Person.prototype.getRecord = function() {
	return this.fullName() + ", " + this.loginID + ", Start Date: " + this.startDate;
}
*/

//create people data and store them in an array
var person1 = new Person("Kim", "Mik", 1, 2000);
var person2 = new Person("Jim", "Mij", 2, 2013);
var person3 = new Person("Hannah", "Hannah", 3, 2003);
var person4 = new Person("Darude", "Sandstorm", 4, 1994);
var person5 = new Person("Original", "Name", 5, 2011);

var peopleArray = [person1, person2, person3, person4, person5];


var people = {
	"p1": {"firstName":"Kim", "lastName":"Mik", "startDate":"2000-01-01"},
	"p2": {"firstName":"Jim", "lastName":"Mij", "startDate":"2013-06-07"},
	"p3": {"firstName":"Hannah", "lastName":"Hannah", "startDate":"2003-11-11"},
	"p4": {"firstName":"Darude", "lastName":"Sandstorm", "startDate":"1994-11-11"},
	"p5": {"firstName":"Original", "lastName":"Name", "startDate":"2011-01-2"},
};



//set up server
var express = require('express');
var app = express();


app.get('/', function (req, res) {
  res.send('There are some people here, woo!');
});


app.get('/people', function(req, res) {
  res.json(people);
});

app.get('/person/:userId',function(req, res) {
  if (people[req.params.userId] != null) {
	res.json(people[req.params.userId]);
  } else {
	res.sendStatus(404);
  }
});


app.get('/person/:userId/name',function(req, res) {
  if (people[req.params.userId] != null) {
	res.json(people[req.params.userId].firstName + " " + people[req.params.userId].lastName);
  } else {
	res.sendStatus(404);
  }
});


app.get('/person/:userId/years',function(req, res) {
  if (people[req.params.userId] != null) {
	var currentDate = new Date();
	var startingDate = new Date(people[req.params.userId].startDate);
	var newYear = currentDate.getFullYear() - startingDate.getFullYear();
	res.json(newYear + " years");
  } else {
	res.sendStatus(404);
  }
});


app.listen(3000, function () {
  console.log('Listening on port 3000!');
});

app.use(express.static('public'));
