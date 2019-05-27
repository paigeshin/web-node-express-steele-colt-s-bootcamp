var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/User");

// ==================
//     AUTH ROUTES
// ==================

//대부분의 어플리케이션의 랜딩페이지는 root에 위치한다.
router.get("/", function(req, res) {
  res.render("landing");
});

//show register form
router.get("/register", function(req, res) {
  res.render("register");
});
//handle sign up logic
router.post("/register", function(req, res) {
  var newUser = new User({ username: req.body.username });
  //passport-local-mongoose
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds");
    });
  });
});

// show login form
router.get("/login", function(req, res) {
  res.render("login");
});

//handling login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

//logout route
router.get("/logout", function(req, res) {
  //comes from passport
  req.logout();
  res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req, res, next) {
  //req.isAuthenticated also comes from `passport`
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
