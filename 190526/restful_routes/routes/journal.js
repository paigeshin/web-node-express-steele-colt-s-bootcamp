var express = require("express");
var router = express.Router();
var Journal = require("../models/journal");

router.get("/", function(req, res) {
  Journal.find({}, function(error, itemsFound) {
    if (!error) {
      res.render("journal/index", { journals: itemsFound });
    }
  });
});

router.get("/add", function(req, res) {
  res.render("journal/new");
});

router.post("/", function(req, res) {
  Journal.create(req.body.journal, function(error, itemCreated) {
    if (!error) {
      res.redirect("/journal");
    }
  });
});

//show
router.get("/:id", function(req, res) {
  Journal.findById(req.params.id, function(error, itemFound) {
    res.render("journal/show", { journal: itemFound });
  });
});

//edit
router.get("/:id/edit", function(req, res) {
  Journal.findById(req.params.id, function(error, itemFound) {
    res.render("journal/edit", { journal: itemFound });
  });
});

//update
router.put("/:id", function(req, res) {
  Journal.findByIdAndUpdate(req.params.id, req.body.journal, function(
    error,
    itemUpdated
  ) {
    if (!error) {
      res.redirect("/journal");
    }
  });
});

//delete
router.delete("/:id", function(req, res) {
  Journal.findByIdAndDelete(req.params.id, function(error) {
    if (!error) {
      res.redirect("/journal");
    }
  });
});

module.exports = router;
