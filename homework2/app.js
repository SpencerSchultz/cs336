
//set up server
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get json file with data
var PEOPLE_FILE = path.join(__dirname, '/public/data/people2.json');


app.get('/', function (req, res) {
  res.send('There are some people here, woo!');
});


app.get('/people', function(req, res) {
	res.sendFile('addPerson.html', {root: './public'});
/*	fs.readFile(PEOPLE_FILE, function(err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		res.json(JSON.parse(data));
	});
	*/
});

app.put('/people', function(req, res, next) {
	fs.readFile(PEOPLE_FILE, function(err, data) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		var people = JSON.parse(data);

    //check if the id already exists
    for (var i = 0; i < people.length; i++) {
      if(people[i].personId === req.body.userId) {
        console.log("put failure, ID already found");
        next(err);
        return;
      }
    }

		var newPerson = {
      personId : req.body.userId,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			startDate: req.body.startDate
		};
    people.push(newPerson);
		fs.writeFile(PEOPLE_FILE, JSON.stringify(people, null, 4), function(err) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			res.json(people);
		});
	});
});


app.get('/fetchAll', function(re1, res) {
	fs.readFile(PEOPLE_FILE, function(err, data) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			res.json(JSON.parse(data));
		});
});

app.get('/person/search',function(req, res) {
	res.sendFile('personSearch.html', {root: './public'});
});

app.get('/person/scripts/personSearch.js', function(req,res) {
	res.sendFile('/scripts/personSearch.js', {root: './public'});
});

app.get('/person/scripts/addPerson.js', function(req,res) {
	res.sendFile('/scripts/addPerson.js', {root: './public'});
});

app.get('/test', function(req,res) {
	fs.readFile(PEOPLE_FILE, function(err, data) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			console.log(JSON.parse(data));
			res.send("ok");
		});
});

app.get('/fetch', function (req, res) {
	fs.readFile(PEOPLE_FILE, function(err, data) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			var tempData = JSON.parse(data);
      //when using a single level json file, must search for the given Id
      for (var i = 0; i < tempData.length; i++) {
        if(tempData[i].personId === req.query.personId) {
          res.json(JSON.stringify(tempData[i]));
          return;
        }
      }
			res.sendStatus(404);
		});
});



app.get('/person/:userId',function(req, res) {
  /* this was the method used for a multilevel json file, saved just in case i need to backtrack
	fs.readFile(PEOPLE_FILE, function(err, data) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			var tempData = JSON.parse(data);
			if (tempData[req.params.userId] != null) {
				res.json(tempData[req.params.userId]);
			} else {
				res.sendStatus(404);
			}
		});
    */
  fs.readFile(PEOPLE_FILE, function(err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var tempData = JSON.parse(data);
      for (var i = 0; i < tempData.length; i++) {
        if(tempData[i].personId === req.params.userId) {
          res.json(tempData[i]);
          return;
        }
      }
      res.sendStatus(404);
    });
});


app.delete('/person/:userId',function(req, res) {
  fs.readFile(PEOPLE_FILE, function(err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var tempData = JSON.parse(data);
      for (var i = 0; i < tempData.length; i++) {
        if(tempData[i].personId === req.params.userId) {
          tempData.splice(i, 1);
          fs.writeFile(PEOPLE_FILE, JSON.stringify(tempData, null, 4), function(err) {
      			if (err) {
      				console.error(err);
      				process.exit(1);
      			}
            res.send('DELETE request made');
            return;
      		});
        }
      }
    });
});



app.get('/person/:userId/name',function(req, res) {
	fs.readFile(PEOPLE_FILE, function(err, data) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			var tempData = JSON.parse(data);
      for (var i = 0; i < tempData.length; i++) {
        if(tempData[i].personId === req.params.userId) {
          res.json(tempData[i].firstName + " " + tempData[i].lastName)
          return;
        }
      }
			res.sendStatus(404);
		});
});


app.get('/person/:userId/years',function(req, res) {
	fs.readFile(PEOPLE_FILE, function(err, data) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			var tempData = JSON.parse(data);
      for (var i = 0; i < tempData.length; i++) {
        if(tempData[i].personId === req.params.userId) {
          var currentDate = new Date();
  				var startingDate = new Date(tempData[i].startDate);
  				var newYear = currentDate.getFullYear() - startingDate.getFullYear();
  				res.json(newYear + " years");
          return;
        }
      }
			res.sendStatus(404);
		});
});


app.listen(3000, function () {
  console.log('Listening on port 3000!');
});

app.use(express.static('public'));
