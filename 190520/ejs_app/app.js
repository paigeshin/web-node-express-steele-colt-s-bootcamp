var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.render("home.ejs");
});

app.get("/fallinlovewith/:thing", function(req, res) {
  var thing = req.params.thing;
  res.render("love.ejs", { thingVar: thing });
});

app.get("/posts", function(req, res) {
  var posts = [
    {
      title: "Post1",
      author: "Susy"
    },
    {
      title: "My adroable pet bunny",
      author: "Charlie"
    },
    {
      title: "Can you believe this pomsy?",
      author: "Colt"
    }
  ];
  res.render("posts.ejs", { posts: posts });
});

app.listen(3000, "127.0.0.1", function() {
  console.log("Server started");
});
