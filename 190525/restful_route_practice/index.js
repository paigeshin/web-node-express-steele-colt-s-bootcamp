var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var Journal = require("./models/Journal");

mongoose.connect("mongodb://127.0.0.1/restful_journal_app", {
  useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//root
app.get("/", function(req, res) {
  res.render("home");
});

//index route, get, index, find({})
app.get("/index", function(req, res) {
  Journal.find({}, function(error, journalsFound) {
    if (!error) {
      res.render("index", { journals: journalsFound });
    }
  });
});

//add route, get, index/add, X
app.get("/index/add", function(req, res) {
  res.render("add");
});

//create route, post, index, create
app.post("/index", function(req, res) {
  Journal.create(req.body.journal, function(error, journalAdded) {
    if (!error) {
      res.redirect("/index");
    }
  });
});

//show route, get, index/:id, findById
app.get("/index/:id", function(req, res) {
  Journal.findById(req.params.id, function(error, journalFound) {
    if (!error) {
      res.render("show", { journal: journalFound });
    }
  });
});

//edit route, get, index/:id/edit, findById
app.get("/index/:id/edit", function(req, res) {
  Journal.findById(req.params.id, function(error, journalFound) {
    if (!error) {
      res.render("edit", { journal: journalFound });
    }
  });
});

//update route, update, index/:id, findByIdAndUpdate
app.put("/index/:id", function(req, res) {
  Journal.findByIdAndUpdate(req.params.id, req.body.journal, function(
    error,
    itemUpdate
  ) {
    if (!error) {
      res.redirect("/index");
    }
  });
});

//delete route, delete, index/:id, findByIdAndDelete
app.delete("/index/:id", function(req, res) {
  Journal.findByIdAndDelete(req.params.id, function(error, itemDeleted) {
    if (!error) {
      res.redirect("/index");
    }
  });
});

app.listen(3000, "127.0.0.1", function() {
  console.log("The Journal App Server has started");
});
