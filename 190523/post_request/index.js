var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var friends = ["kim", "lee", "park"];

app.get("/", function(req, res) {
  res.render("home");
});

//친구를 보여줌
app.get("/friends", function(req, res) {
  res.render("friends", { friends: friends });
  //friends라는 페이지 내부에 친구를 추가하는 form tag가 있다.
});

//친구를 추가함
app.post("/addfriend", function(req, res) {
  //friends안에 들어있는 폼태그로 post request를 던지면 여기 코드가 작동한다.
  var newfriend = req.body.newfriend;
  friends.push(newfriend);
  res.redirect("/friends");
});

app.listen(3000, "127.0.0.1", function() {
  console.log("Server has stared");
});
