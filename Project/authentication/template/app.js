var express = require("express");
var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/auth_demo_app");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/secret", function(req, res) {
  res.render("secret");
});

app.listen(3000, "127.0.0.1", function() {
  console.log("Server has started!");
});
