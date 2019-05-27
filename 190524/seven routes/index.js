var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

var Journal = require("./models/Journal");

mongoose.connect("mongodb://127.0.0.1/restful_route_app", {
  useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//root
app.get("/", function(req, res) {
  res.render("landing");
});

// Journal.create(
//   {
//     title: "article_1",
//     image:
//       "data:image/jpeg;base64,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",
//     body: "loream ipsum....."
//   },
//   function(error, journalAdded) {
//     if (!error) {
//       console.log(journalAdded);
//     }
//   }
// );

//index route /index , find()
app.get("/journals", function(req, res) {
  Journal.find({}, function(error, journalsFound) {
    if (!error) {
      res.render("journals", { journals: journalsFound });
    }
  });
});

//add route /index/add
app.get("/journals/add", function(req, res) {
  res.render("new");
});

//create route /index , create()
app.post("/journals", function(req, res) {
  Journal.create(req.body.journal, function(error, journalAdded) {
    if (!error) {
      res.redirect("/journals");
    }
  });
});

//show route /index/:id,  findById
app.get("/journals/:id", function(req, res) {
  Journal.findById(req.params.id, function(error, journalFound) {
    if (!error) {
      res.render("show", { journal: journalFound });
    }
  });
});

//edit route /index/:id/edit, findById
app.get("/journals/:id/edit", function(req, res) {
  Journal.findById(req.params.id, function(error, journalFound) {
    if (!error) {
      res.render("edit", { journal: journalFound });
    }
  });
});

//update route /index/:id, findByIdAndUpdate
app.put("/journals/:id", function(req, res) {
  Journal.findByIdAndUpdate(req.params.id, req.body.journal, function(
    error,
    journalUpdated
  ) {
    if (!error) {
      res.redirect("/journals/" + req.params.id);
    }
  });
});

//delete route /index/:id, findByIdAndRemove
app.delete("/journals/:id", function(req, res) {
  Journal.findByIdAndRemove(req.params.id, function(error) {
    if (!error) {
      res.redirect("/journals");
    }
  });
});

app.listen(3000, "127.0.0.1", function() {
  console.log("Server has started");
});
