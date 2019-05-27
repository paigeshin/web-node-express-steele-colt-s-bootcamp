var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("search");
});

app.get("/results", function(req, res) {
  //get으로 들어오는 값은 req.query로 값을 받아햔다.
  request(
    "http://omdbapi.com?apiKey=thewdb&s=" + req.query.search + "&y",
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        res.render("results", { data: data });
      }
    }
  );
});

app.listen(3000, "127.0.0.1", function() {
  console.log("Movie App has started!!!");
});
