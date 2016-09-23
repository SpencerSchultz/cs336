var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello Calvin World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.use(express.static('public'));
