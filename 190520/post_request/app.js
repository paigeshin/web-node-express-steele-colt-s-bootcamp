var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/friends", function(req, res) {
  res.render("friends", { friends: friends });
});

app.post("/addfriend", function(req, res) {
  console.log(req.body);
  var newfriend = req.body.newfriend;
  friends.push(newfriend);
  res.redirect("/friends");
});

app.listen(3000, "127.0.0.1", function() {
  console.log("server has started");
});
