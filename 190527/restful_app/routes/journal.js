var express = require("express");
var router = express.Router();

var Journal = require("../models/journal");

router.get("/", function(req, res) {
  Journal.find({}, function(error, foundItems) {
    if (error) {
      req.flash("error", "Something went wrong!");
    } else {
      req.flash("Here are your posts!");
      console.log(foundItems);
      res.render("journal/journals", { journals: foundItems });
    }
  });
});

router.get("/new", function(req, res) {
  res.render("journal/new");
});

router.post("/", function(req, res) {
  var journalTobeAdded = req.sanitize(req.body.journal);
  Journal.create(journalTobeAdded, function(error, itemCreated) {
    if (error) {
      req.flash("error", "Something went wrong");
    } else {
      req.flash("Successfully created your journal!");
      res.redirect("/journal/journals");
    }
  });
});

router.get("/:id", function(req, res) {
  Journal.findById(req.params.id, function(error, foundItem) {
    if (error) {
      req.flash("error", "Something went wrong");
    } else {
      req.flash("success", "This is your item!");
      res.render("journal/show", { journal: foundItem });
    }
  });
});

//edit route
router.get("/:id/edit", function(req, res) {
  Journal.findById(req.params.id, function(error, foundItem) {
    if (error) {
      req.flash("error", "Something went wrong");
    } else {
      req.flash("success", "This is your item!");
      res.render("journal/edit", { journal: foundItem });
    }
  });
});

//update route
router.put("/:id", function(req, res) {
  var journalTobeEditted = req.sanitize(req.body.journal);
  Journal.findByIdAndUpdate(req.params.id, journalTobeEditted, function(
    error,
    foundItem
  ) {
    if (error) {
      req.flash("error", "Something went wrong");
    } else {
      req.flash("success", "This is your item! Edit now");
      res.redirect("/journals/" + req.params.id);
    }
  });
});

//delete route
router.delete("/:id", function(req, res) {
  Journal.findByIdAndDelete(req.params.id, function(error) {
    if (error) {
      req.flash("error", "Something went wrong");
    } else {
      req.flash("success", "This is your item! Edit now");
      res.redirect("/journals");
    }
  });
});

module.exports = router;
