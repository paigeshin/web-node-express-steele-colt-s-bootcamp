var express = require("express");
var router = express.Router();
var Campground = require("../models/Campground");
var middleware = require("../middleware");

var isLoggedIn = middleware.isLoggedIn;
var checkCampgroundOwnership = middleware.checkCampgroundOwnership;

//index route, Display a list of all campgrounds
router.get("/", function(req, res) {
  console.log(req.user); //이것도 passport에서 온다. 로그인을 하면 req.user안에 유저 정보가 들어있는 것을 확인할 수 있다!
  //Get all campgrounds from DB
  Campground.find({}, function(err, itemsReturned) {
    if (err) {
      console.log(err);
    } else {
      //어레이 push 해서 보낼줄 알았는데, mongoDB에서 mongoose가 데이터를 가져올 때 그냥 array형태로 가져오는 듯.
      res.render("campgrounds/index", {
        campgrounds: itemsReturned,
        currentUser: req.user
      });
      //passport를 통해서 생겨난 user 정보를 페이지에 넘길 수 있다 ~
    }
  });
});

//create route, Add new dog to DB
router.post("/", isLoggedIn, function(req, res) {
  //get data from form and add to campgrounds array.
  var name = req.body.name; //body parser를 설치했기 때문에 곧바로 접근 할 수 있다.
  var price = req.body.price;
  var image = req.body.image; //body parser를 설치했기 때문에 곧바로 접근 할 수 있다.
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {
    name: name,
    price: price,
    image: image,
    description: description,
    author: author
  };
  console.log(req.users);
  Campground.create(newCampground, function(err, itemReturned) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
      //redirect back to campgrounds page - for refresh
    }
  });
});

//new route, Displays form to make a new dog
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new.ejs");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
  //find the campground with provided ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        //render show template with that campground
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
  //reference를 하는 구조라면
  //Object.findById().populate().exe() 을 사용 해야 한다
});

//Edit Campground Route
router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
  //user가 campground를 소유하고 있으면, 즉 유저의 post라면 밑에 있는 코드가 진행된다.
  Campground.findById(req.params.id, function(err, foundCampground) {
    res.render("campgrounds/edit", { campground: foundCampground });
  });
});

//Update Campground Route
router.put("/:id", function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
    err,
    itemUpdated
  ) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Destroy Campground Route
router.delete("/:id", checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndDelete(req.params.id, function(err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
