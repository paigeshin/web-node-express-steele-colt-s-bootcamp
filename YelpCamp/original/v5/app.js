var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//모델들 가져오기
var Campground = require("./models/Campground");
var Comment = require("./models/comment");
// var User = require("./models/user");

//Seed file 설정
var seedDB = require("./seeds");

//연결
mongoose.connect("mongodb://127.0.0.1/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB(); //안에있는 데이터 다 초기화 시킴. -> 작업을 위해서

//대부분의 어플리케이션의 랜딩페이지는 root에 위치한다.
app.get("/", function(req, res) {
  res.render("landing");
});

//index route, Display a list of all dog
app.get("/campgrounds", function(req, res) {
  //Get all campgrounds from DB
  Campground.find({}, function(err, itemsReturned) {
    if (err) {
      console.log(err);
    } else {
      //어레이 push 해서 보낼줄 알았는데, mongoDB에서 mongoose가 데이터를 가져올 때 그냥 array형태로 가져오는 듯.
      res.render("campgrounds/index", { campgrounds: itemsReturned });
    }
  });
});

//create route, Add new dog to DB
app.post("/campgrounds", function(req, res) {
  //get data from form and add to campgrounds array.
  var name = req.body.name; //body parser를 설치했기 때문에 곧바로 접근 할 수 있다.
  var image = req.body.image; //body parser를 설치했기 때문에 곧바로 접근 할 수 있다.
  var description = req.body.description;
  var newCampground = { name: name, image: image, description: description };
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
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
  //find the campground with provided ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        //render show template with that campground
        console.log(foundCampground);
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
  //reference를 하는 구조라면
  //Object.findById().populate().exe() 을 사용 해야 한다
});

//============
//COMMENTS ROUTES
//============

app.get("/campgrounds/:id/comments/new", function(req, res) {
  //find campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

//Post
app.post("/campgrounds/:id/comments", function(req, res) {
  //lookup campground using ID
  Campground.findById(req.params.id, function(err, campground) {
    //campground가 있어야지 댓글이 있기 때문에 campground부터 찾아야한다.
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          //connect new comment to campground
          campground.comments.push(comment); //다시 한 번 기억하자. campground라는 collection이 ref를 하고 있더라도 Comment라는 collection에 값이 추가된다.
          campground.save(); //저장.
          //redirect campground show page
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

app.listen(3000, "127.0.0.1", function() {
  console.log("The YelpCamp Server Has Started!");
});
