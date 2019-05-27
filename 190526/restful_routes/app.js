var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var journalRoutes = require("./routes/journal");
var method_override = require("method-override");

mongoose.connect("mongodb://127.0.0.1/restful_journal_app", {
  useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(method_override("_method"));
app.use("/journal", journalRoutes);

app.get("/", function(req, res) {
  res.render("landing");
});

app.listen(3000, "127.0.0.1", function() {
  console.log("Server is running");
});
