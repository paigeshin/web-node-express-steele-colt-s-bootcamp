var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var Journal = require("./models/Journal.js");

mongoose.connect("mongodb://127.0.0.1/restful_journal", {
  useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//index - route
app.get("/", function(req, res) {
  res.render("home");
});
//get, show all contents, Journal.find()
app.get("/index", function(req, res) {
  Journal.find({}, function(error, journals) {
    if (error) {
      console.log(error);
    } else {
      res.render("index", { journals: journals });
    }
  });
});

//new - route
//get, go to 'new' page where there's form tag, No need for mongoose method
app.get("/index/new", function(req, res) {
  res.render("new");
});

//crate - route
//post, add actually to db, insert?
app.post("/index", function(req, res) {
  req.body.journal.title = req.sanitize(req.body.journal.title);
  req.body.journal.image = req.sanitize(req.body.journal.image);
  req.body.journal.body = req.sanitize(req.body.journal.body);
  Journal.create(req.body.journal, function(error, journal) {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/index");
    }
  });
});

//show - route
app.get("/index/:id", function(req, res) {
  Journal.findById(req.params.id, function(err, journal) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { journal: journal });
    }
  });
});

//edit - route
app.get("/index/:id/edit", function(req, res) {
  Journal.findById(req.params.id, function(error, journal) {
    if (error) {
      res.redirect("/index");
    } else {
      res.render("edit", { journal: journal });
    }
  });
});

//update - route
app.put("/index/:id", function(req, res) {
  req.body.journal.title = req.sanitize(req.body.journal.title);
  req.body.journal.image = req.sanitize(req.body.journal.image);
  req.body.journal.body = req.sanitize(req.body.journal.body);
  Journal.findByIdAndUpdate(req.params.id, req.body.journal, function(
    error,
    updatedJournal
  ) {
    if (error) {
      res.redirect("/index");
    } else {
      res.redirect("/index/" + req.params.id);
    }
  });
});

//destroy - route
app.delete("/index/:id", function(req, res) {
  Journal.findByIdAndDelete(req.params.id, req.body.journal, function(error) {
    if (error) {
      res.send("Something went wrong");
    } else {
      res.redirect("/index");
    }
  });
});

app.listen(3000, "127.0.0.1", function() {
  console.log("Server has started");
});
