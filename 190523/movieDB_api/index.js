var express = require("express");
var request = require("request");
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/findMovie", function(req, res) {
  var searchTerm = req.query.movieToSearch;
  request("http://www.omdbapi.com/?apiKey=thewdb&s=" + searchTerm, function(
    error,
    response,
    body
  ) {
    var movies = JSON.parse(body);
    res.render("findMovie", { movies: movies });
  });
});

app.listen(3000, "127.0.0.1", function() {
  console.log("Our movie server has started");
});
