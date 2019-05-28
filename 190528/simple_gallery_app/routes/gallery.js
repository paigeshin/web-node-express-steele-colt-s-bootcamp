var express = require("express");
var router = express.Router({ mergeParams: true });
var Photo = require("../models/photo");

router.get("/", function(req, res) {
  Photo.find({}, function(error, itemsFound) {
    res.render("gallery/index", { photos: itemsFound });
  });
});

router.get("/add", function(req, res) {
  res.render("gallery/add");
});

router.post("/", function(req, res) {
  Photo.create(req.body.photo, function(error, itemCreated) {
    if (error) {
      return req.flash("error", "Something went wrong");
    }
    req.flash("success", "Successfully Added!");
    res.redirect("/gallery");
  });
});

router.get("/:id", function(req, res) {
  Photo.findById(req.params.id, function(error, itemFound) {
    if (error) {
      return req.flash("error", "Something went wrong");
    }
    req.flash("success", "This is the photo");
    res.render("gallery/show", { photo: itemFound });
  });
});

router.get("/:id/edit", function(req, res) {
  Photo.findById(req.params.id, function(error, itemFound) {
    if (error) {
      return req.flash("error", "Something went wrong");
    }
    req.flash("Edit page!");
    res.render("gallery/edit", { photo: itemFound });
  });
});

router.put("/:id", function(req, res) {
  Photo.findByIdAndUpdate(req.params.id, req.body.photo, function(
    error,
    itemfound
  ) {
    if (error) {
      return req.flash("error", "Something went wrong");
    }
    req.flash("success", "Successfully updated your photo!");
    res.redirect("/gallery/" + req.params.id);
  });
});

router.delete("/:id", function(req, res) {
  Photo.findByIdAndDelete(req.params.id, function(error) {
    if (error) {
      return req.flash("error", "Something went wrong");
    }
    req.flash("success", "Successfully deleted your photo!");
    res.redirect("/gallery");
  });
});

module.exports = router;
