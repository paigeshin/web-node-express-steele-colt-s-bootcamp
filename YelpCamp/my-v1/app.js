var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  //mongodb setup
  mongoose = require("mongoose");

//연결
mongoose.connect("mongodb://127.0.0.1/yelp_camp", { useNewUrlParser: true });
//모델 설정(schema) Schema setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
//compile
var Campground = mongoose.model("Campground", campgroundSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//대부분의 어플리케이션의 랜딩페이지는 root에 위치한다.
app.get("/", function(req, res) {
  res.render("landing");
});

//index route, Display a list of all dog
app.get("/campgrounds", function(req, res) {
  //Get all campgrounds from DB
  Campground.find({}, function(err, itemsReturend) {
    if (err) {
      console.log(err);
    } else {
      //어레이 push 해서 보낼줄 알았는데, mongoDB에서 mongoose가 데이터를 가져올 때 그냥 array형태로 가져오는 듯.
      res.render("index", { campgrounds: itemsReturend });
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
  res.render("new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
  //find the campground with provided ID
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      //render show template with that campground
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen(3000, "127.0.0.1", function() {
  console.log("The YelpCamp Server Has Started!");
});
