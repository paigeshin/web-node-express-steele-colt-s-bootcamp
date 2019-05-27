var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/User");
var middleware = require("../middleware");

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
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome to YelpCamp " + user.username);
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
  req.flash("success", "Logged you out");
  res.redirect("/campgrounds");
});

module.exports = router;
