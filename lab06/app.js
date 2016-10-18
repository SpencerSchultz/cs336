/* 
 * 6.1 A)In Chrome I could only really test the get methods,  but with cURL
 *		I had no trouble testing every method
 *     B)I liked using error 204 (no content), as it has a redirect function it
 *		it seems, but I still imagine 404 would be the most appropriate
 *
 * 6.2 A)GET or POST
 *     B)The data is being passed back via a POST request, syntactically as text
 *		connected to the name of the HTML element where it was entered
 */

var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello Calvin world!');
});

app.get('/forms', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/forms/doc1.html'));
});

//Need to allow a client to get at the style sheet
app.get('/forms/style1.css', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/forms/style1.css'));
});

app.post('/forms', function (req, res) {
  console.log(req.body);
  res.send(req.body.user_message);
});

app.route('/request')
	.get(function (req, res) {
  		res.send('This is the request page');
	})
	.head(function (req, res) {
  		console.log('head request was generated');
		res.send('head request was generated');
	})
	.put(function (req, res) {
		res.send('put request was generated');
		console.log('put request was generated');
	})
	.post(function (req, res) {
		console.log('post request was generated');
		res.send('delete request was generated');
	})
	.delete(function (req, res) {
		console.log('delete request was generated');
		res.send('delete request was generated');
	});

// This worked before I put in the /forms css sheet, but it blocks the css sheet somehow
app.all('*', function (req, res) {
  console.log('Sending a 204 status code');
  res.sendStatus(204);
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.use(express.static('public'));
