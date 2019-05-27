var express = require("express");
var mongoose = require("mongoose");
//1-passport
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");

mongoose.connect("mongodb://127.0.0.1/auth_demo_app", {
  useNewUrlParser: true
});

var app = express();
app.set("view engine", "ejs");

//1-passport: set express-session - 아마도 express에서 Session을 사용하기 위해서 설정하나보다.
app.use(
  require("express-session")({
    secret: "I want to marry japanese girl", //It can be anything
    resave: false, //colt가 제대로 설명하지 않는다. 근데 이것을 설정해주지 않으면 설정하라고 app에서 메시지가 나오기 때문에 설정.
    saveUninitialized: false //colt가 제대로 설명하지 않는다. 근데 이것을 설정해주지 않으면 설정하라고 app에서 메시지가 나오기 때문에 설정.
  })
);
//1-passport setting
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
//1-passprot setting => responsible for reading the `session`. encoding and decoding it.
//Session을 사용할 때 serialize, deserialize를 사용해야하나 보다.
//원래는 개발자가 정의해야하지만, 여기서는 passport-local-mongoose가 대신 해준다.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//3-passport: passport에 정책추가하기 - passport-local-mongoose를 통해 더 편하게 설정가능.
passport.use(new LocalStrategy(User.authenticate()));

//============
//   Routes
//============
app.get("/", function(req, res) {
  res.render("home");
});

//4-passport: isLoggedIn middleware 추가.
app.get("/secret", isLoggedIn, function(req, res) {
  res.render("secret");
});

//2-passport Auth routes
//2-passport Show sign up form.
app.get("/register", function(req, res) {
  res.render("register");
});
//2-passport user sign up
app.post("/register", function(req, res) {
  //User.register(a1, a2, a3)
  //위 메소드는 passport-local-mongoose가 제공하는 메소드다.
  //a1 => db에 저장할 유저 정보
  //a2 => 비밀번호. (db에 저장하는 것이 아니다.)
  //a3 => callback(error, UserRegistered)
  //오직 req.body.username만 db에 저장하는 것을 확인하자!
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
      }
      //passport.authenticate("Strategy")
      //Session을 알아서 관리해준다.
      //인증절차를 대신 처리해준다.
      //register을 할 때는 passport에 굳이 `local`strategy를 추가해주지 않아도 된다.
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secret");
      });
      //db에 저장된 모습은 이러하다
      //{
      // "_id": ObjectId("아무렇게나 나열되어있는 숫자와 문자").
      // "salt": "아무렇게나 나열되어있는 숫자와 문자"
      // "username": "유저이름"
      // 여기서 salt는 hash를 푸는데 도움주는 것이라고 한다.
      //}
    }
  );
});

//3-passport: Login Routes
//3-passport: render login form
app.get("/login", function(req, res) {
  res.render("login");
});

//3-passport: Login logic - middleware
//middleware에 들어가는 중간 함수 분석
//passport.authenticate(a1, a2)
//a1 => strategy to adopt
//a2 => 객체.
//middlewaire로 passport를 local을 쓰고 싶다면 반드시 passport에 추가해줘야한다.
//이 함수가 자동으로 유저의 id와 password를 비교해준다.
//middleware: It runs between the start and the end of the route.
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

//4-passport, logout =>하지만 로그아웃 후에도 secret page에 들어갈 수 있다.
app.get("/logout", function(req, res) {
  //session 값을 해체시키는 passport에서 제공하는 함수.
  req.logout();
  res.redirect("/");
});

//4-passport: middleware, 이것을 secret으로 render해주는 route를 찾아서 넣을 것이다.
function isLoggedIn(req, res, next) {
  //middleware a3 => 다음 로직. 내가 굳이 작성하지 않아도 된다.
  //req.isAuthenticated() => session 값이 있는지 없는지 확인하는 passport에서 제공하는 함수
  if (req.isAuthenticated()) {
    //session값이 브라우저에 있다면 다음 순번의 로직을 실행시켜라
    console.log(req.isAuthenticated());
    return next();
  }
  //session값이 없다면 login 페이지로 다시 보낸다.
  res.redirect("/login");
}

app.listen(3000, "127.0.0.1", function() {
  console.log("Server Started.....");
});
