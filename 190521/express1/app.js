var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("Hi there!");
});

app.get("/bye", function(req, res) {
  res.send("Goodbye");
});

app.get("/dog", function(req, res) {
  console.log("Someone Made a Request");
});

app.listen(3000, "127.0.0.1", function() {
  console.log("Server has started!");
});
