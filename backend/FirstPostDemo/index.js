var express = require("express");
var app = express();
var bodyParser = require("body-parser"); //새로 설치한 npm body-parser 을 사용하기 위한 코드.

app.use(bodyParser.urlencoded({extended: true})); //새로 설치한 npm body-parser을 사용하기 위한 코드
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", function(req, res){
    res.render("home");
})

app.get("/friends", function(req, res){
    res.render("friends", {friends : friends});
})

//post request!!! => post 방식으로 request가 들어오면 handle하는 코드.
app.post("/addfriend", function(req, res){
    console.log(req.body);
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    // res.send("You have reached the post route");
    res.redirect("/friends");
})

app.listen(3000, "127.0.0.1", function(){
    console.log("server has started");
})