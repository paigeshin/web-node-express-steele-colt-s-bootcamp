var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//passport가져오기
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");

//모델들 가져오기
// var Campground = require("./models/Campground");
// var Comment = require("./models/comment");
var User = require("./models/User");

//Seed file 설정
var seedDB = require("./seeds");

//★★★★★route 가져오기
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/index");

//연결
mongoose.connect("mongodb://127.0.0.1/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//seedDB(); //안에있는 데이터 다 초기화 시킴. -> 작업을 위해서, Seed The DB
app.use(methodOverride("_method"));

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

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, "127.0.0.1", function() {
  console.log("The YelpCamp Server Has Started!");
});
