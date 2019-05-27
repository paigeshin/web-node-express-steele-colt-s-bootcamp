const express = require("express");
const app = express();

app.use(express.static("public")); //어떤 디렉토리를 assets으로 사용할 것인지 지정해주는 코드, views는 자동으로 지정되어 있다.
//해석: 야 컴퓨터야, 나는 public 폴더를 assets으로 사용할꺼야. 나중에 '/'를 이용해서 css를 찾을 때 유용하겠지?!
app.set("view engine", "ejs");

//아래와 같은 '/' 형태를 root이라고 부른다.
app.get("/", function(req, res){
	res.render("home"); //html을 render해주는 function
})

//fall in love with rusty 
//fall in love with pomsky
app.get("/fallinlovewith/:thing", function(req, res){
	var thing = req.params.thing;
	res.render("love", {thingVar : thing});
	//경로를 지정안해줘도 찾는다. love.ejs는 views/love.ejs에 존재. 
	//값을 넘길때, render a2에 js object-dictionary 형식으로 보내준다. {넘겨질 값(there) : 넘기는 값(here)} {there : here}
})

//post
app.get("/posts", function(req, res){
	var posts = [
		{
			title: "Post 1",
			author: "Susy",
		},
		{
			title: "My adorable pet bunny",
			author: "Charlie"
		},
		{
			title: "Can you believe this pomsky?",
			author: "Colt"
		}
	]

	res.render("post", {posts : posts})
})

app.listen(3000, "127.0.0.1", function(){
	console.log("Successfully Conntected!");
})