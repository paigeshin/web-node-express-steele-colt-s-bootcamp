var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var User = require("./models/User");

mongoose.connect("mongodb://localhost/auth_demo_app", {
  useNewUrlParser: true
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "Japanese girl is the cutest in the world",
    resave: false,
    saveUninitialized: false
  })
);
//passport를 사용하려면 여기 밑에 두 가지 코드는 필수다.
app.use(passport.initialize());
app.use(passport.session());

//이것을 설정해줘야 passport가 session을 읽고 해체시킬 수 있다.
//session을 encode decode
passport.use(new LocalStrategy(User.authenticate())); //이렇게하면 authenticate method를 부르지 않아도 된다. 이것을 설정해줘야지 midddleware로 사용할 수 있다.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===================================
// Routes
// ===================================

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/secret", function(req, res) {
  res.render("secret");
});

//Auth Routes
app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", function(req, res) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      //we don't actually save password in DB, which is a bad idea.
      if (err) {
        console.log(err);
        return res.render("register");
      }
      //이게 실제로 session값을 브라우저에 저장해주고 passport를 실행해주는 코드다.
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secret");
      });
      //"facebook" "twitter"
    }
  );
});

//Login Routes
//render login form
app.get("/login", isLoggedIn, function(req, res) {
  res.render("login");
});
//login logic
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);
//위의 코드 같은 형태를 middleware라고 부른다. route에 쓰이는 개념이다. beginning of the route - (middle ware) 여기다가 원하는 로직을 추가할 수 있다. - end of the route

//logout
app.get("/logout", function(req, res) {
  req.logout(); //로그아웃
  res.redirect("/");
});

//standard middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, "127.0.0.1", function() {
  console.log("Server has started!");
});
