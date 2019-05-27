var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//passport가져오기
var passport = require("passport");
var LocalStrategy = require("passport-local");

//모델들 가져오기
var Campground = require("./models/Campground");
var Comment = require("./models/comment");
var User = require("./models/user");

//Seed file 설정
var seedDB = require("./seeds");

//PASSPORT Configuration
app.use(
  require("express-session")({
    secret: "Once again, Japanese girl is the best",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

//User.authenticate(), User.serializeUser(), User.deserializeUser() => three methods that come with passport-local-mongoose
//몽구스를 사용하지 않는다면 개발자가 직업 구현해야한다.
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//어떤 function route든간에 밑에 코드를 쓰면 모든 route에 실행된다. 이것 또한 미들웨어이다!
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  //res.locals는 express 내부에 있는 constant
  //res.locals.내가_원하는값_변수이름 = 원하는 값
  //next() 코드를 호출하지 않으면 넘어가지 않는다! 무조건 호출하자!
  next();
}); //이 코드를 해석하자면, 모든 route에 user값을 보내라는 것이다.

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
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
  //reference를 하는 구조라면
  //Object.findById().populate().exe() 을 사용 해야 한다
});

//============
//COMMENTS ROUTES
//============

//유저가 로그인되지 않았다면 코멘트를 못달게 하기 위해서 middleware를 넣었다.
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
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
//url을 통해서 comments 경로로 들어가려고 할 때도 막기위해서 middleware를 적용
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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
// ==================
//     AUTH ROUTES
// ==================

//show register form
app.get("/register", function(req, res) {
  res.render("register");
});
//handle sign up logic
app.post("/register", function(req, res) {
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
app.get("/login", function(req, res) {
  res.render("login");
});

//handling login logic
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

//logout route
app.get("/logout", function(req, res) {
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

app.listen(3000, "127.0.0.1", function() {
  console.log("The YelpCamp Server Has Started!");
});
