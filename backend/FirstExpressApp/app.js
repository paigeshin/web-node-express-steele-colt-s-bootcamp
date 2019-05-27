//SettingUp Express Framework
var express = require("express");
//app이라는 변수에다가 저장.
var app = express();

// app.get()
// app.post()
// app.put()

// "/" => "Hi there!";
app.get("/", function(req, res){
	//req - request
	//res - response
	res.send("Hi there!"); 
})

// "/bye" => "Goodbye!";
app.get("/bye", function(req, res){
	res.send("Goodbye!");
})

// "/dog" => "MEOW!";
app.get("/dog", function(req, res){
	console.log("SOMEONE MADE A REQUEST");
	res.send("MEOW!");
})

app.get("/r/:subredditName", function(req, res){
	res.send("welcome to subtitle");
})

app.get("/r/:posts/comments/:id/:title/", function(req, res){
	console.log(req.params);
	res.send("Welcome to the comments page!");
})

app.get("*", function(req, res){
	res.send("This is default~");
})

//a1 - port number
//a2 - ipAddress or callback function 
//a3 - callback functiion
app.listen(3000, "127.0.0.1", function(){
	console.log("Server Started!");
})