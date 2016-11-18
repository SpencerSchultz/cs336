
//set up server
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var db;
//get json file with data
var PEOPLE_FILE = path.join(__dirname, 'people.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', express.static(path.join(__dirname, 'dist')));

//connect to mongoDB database
MongoClient.connect('mongodb://cs336:PASSWORD@ds053808.mlab.com:53808/srs27_cs336', function (err, dbConnection) {
  if (err) throw err;

  db = dbConnection;

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: './public'});
});


app.get('/people', function(req, res) {
	res.sendFile('addPerson.html', {root: './public'});
});

app.put('/people', function(req, res, next) {
  var collection = db.collection('people');

  var newPerson = {
    _id : req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    startDate: req.body.startDate
  };

  collection.insert(newPerson, function(err, result) {
    assert.equal(err, null);
  });

  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.json(docs);
  });
});


app.get('/fetchAll', function(re1, res) {
  var collection = db.collection('people');

  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.json(docs);
  });
});

app.post('/fetchAll', function(req, res, next) {
  var collection = db.collection('people');

  var newPerson = {
    _id : req.body._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    startDate: req.body.startDate
  };

  collection.insert(newPerson, function(err, result) {
    assert.equal(err, null);
  });

  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.json(docs);
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

app.get('/fetch', function (req, res) {
  var collection = db.collection('people');

  var foundPerson = collection.find( { _id: req.query.personId } );
    foundPerson.toArray(function(err, docs) {
      assert.equal(err, null);
      if (docs[0] === undefined) {
        res.sendStatus(404);
      } else {
        res.json(JSON.stringify(docs, null, 4));
      }
    });
});



app.get('/person/:userId',function(req, res) {
    var collection = db.collection('people');

    var foundPerson = collection.find( { _id: req.params.userId } );
      foundPerson.toArray(function(err, docs) {
        assert.equal(err, null);
        if (docs[0] === undefined) {
          res.sendStatus(404);
        } else {
          res.json(docs);
        }
      });
});


app.delete('/person/:userId',function(req, res) {
  var collection = db.collection('people');

  try {
    collection.deleteOne( { _id: req.params.userId });
    res.send('DELETE request made');
  } catch (e) {
    console.log(e);
    res.send('DELETE request failed');
  }
});



app.get('/person/:userId/name',function(req, res) {
  var collection = db.collection('people');

  //check if user is in database
  var foundPerson = collection.find( { _id: req.params.userId } );
    foundPerson.toArray(function(err, docs) {
      assert.equal(err, null);
      if (docs[0] === undefined) {
        res.sendStatus(404);
      } else {
        res.json(docs[0].firstName + " " + docs[0].lastName);
      }
    });
});


app.get('/person/:userId/years',function(req, res) {
  var collection = db.collection('people');

  //check if user is in database
  var foundPerson = collection.find( { _id: req.params.userId } );
    foundPerson.toArray(function(err, docs) {
      assert.equal(err, null);
      if (docs[0] === undefined) {
        res.sendStatus(404);
      } else {
        var currentDate = new Date();
        var startingDate = new Date(docs[0].startDate);
        var newYear = currentDate.getFullYear() - startingDate.getFullYear();
        res.json(newYear + " years");
    }
    });
});


app.listen(3000, function () {
  console.log('Listening on port 3000!');
});

app.use(express.static('public'));

});
