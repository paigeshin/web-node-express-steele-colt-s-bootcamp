var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var session = require("express-session");
var flash = require("connect-flash");

var indexRouter = require("./routes/index");
var journalRouter = require("./routes/journal");

//Basic Setting
mongoose.connect("mongodb://127.0.0.1/restful_app", {
  useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(
  session({
    secret: "asdfsdfsdaf",
    resave: false,
    saveUninitialized: true
  })
);
app.use(flash());
app.use(expressSanitizer());

app.use(function(req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", indexRouter);
app.use("/journals", journalRouter);

app.listen(3000, "127.0.0.1", function() {
  console.log("Server has started");
});
