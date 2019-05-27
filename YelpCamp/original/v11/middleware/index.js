//all the middleware goes here
var middlewareObj = {};
var Campground = require("../models/Campground");
var Comment = require("../models/Comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
  // is user logged in ?
  if (req.isAuthenticated()) {
    //does user own the campground?
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        res.redirect("back");
      } else {
        // does user own the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
  // is user logged in ?
  if (req.isAuthenticated()) {
    //does user own the campground?
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        res.redirect("back");
      } else {
        // does user own the campground?
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function(req, res, next) {
  //req.isAuthenticated also comes from `passport`
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("success", "Please Login First!");
  res.redirect("/login");
};

module.exports = middlewareObj;
