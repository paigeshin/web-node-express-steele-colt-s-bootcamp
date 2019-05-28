//필요한 모듈
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  expressSanitizer = require("express-sanitizer"),
  expressSession = require("express-session"),
  methodOverride = require("method-override"),
  connectFlash = require("connect-flash"),
  mongoose = require("mongoose");

//models
var Photo = require("./models/photo");

//routes
var indexRoute = require("./routes/index"),
  galleryRoute = require("./routes/gallery");

//기본적인 설정들
mongoose.connect("mongodb://127.0.0.1/example_app", {
  useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(
  expressSession({
    secret: "Demo Application",
    resave: false,
    saveUninitialized: false
  })
);
app.use(connectFlash());
//앱의 시스템 변수
app.use(function(req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//route 설정
app.use("/", indexRoute);
app.use("/gallery", galleryRoute);

app.listen(3000, "127.0.0.1", function() {
  console.log("Our gallery App has started");
});
