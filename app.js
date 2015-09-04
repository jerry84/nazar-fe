var express = require('express');

var app = express();

app.set("view options", {layout: false});
app.use("/css", express.static(__dirname + '/build/css'));
app.use(express.static(__dirname + '/build/templates'));

app.get('/', function(req, res) {
  res.render('index.html');
});

app.listen(3000);