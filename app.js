var express = require('express');

var app = express();

app.set("view options", {layout: false});
app.use("/css", express.static(__dirname + '/build/css'));
app.use("/img", express.static(__dirname + '/build/img'));
app.use(express.static(__dirname + '/build'));

app.get('/', function(req, res) {
  res.render('index.html');
});

app.listen(3000);