/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var db;

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//connect to mongoDB database
MongoClient.connect('mongodb://cs336:Bjarne@ds053808.mlab.com:53808/srs27_cs336', function (err, dbConnection) {
  if (err) throw err;

  db = dbConnection;


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/links', function(req, res) {
    var collection = db.collection('links');
      //get all the links
      collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        res.json(docs);
      });
});


app.post('/api/links', function(req, res) {
    var collection = db.collection('links');

    //make a new link based on data pulled from virtual DOM
    var newLink = {
    //id given as the current date, alsocan be used to help generate statistics
      _id: Date.now(),
      link: req.body.link,
      nickName: req.body.nickName,
      lastVisited: Date.now(),
      tag1: req.body.tag1,
    };

    collection.insert(newLink, function(err, result) {
      assert.equal(err, null);
      res.json(result);
    });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

});
