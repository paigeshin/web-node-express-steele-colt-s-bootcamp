const express = require('express');
const app = express();
const port = 3000;
const ip = "127.0.0.1";

app.get("/speak/:animal", function(req, res){
	
	if(req.params.animal == 'pig'){
		res.send("Oink");
	}
	else if(req.params.animal == 'cow'){
		res.send("Moo");
	}
	else if(req.params.animal == 'dog'){
		res.send("Woof Woof!");
	}

})

app.get("/repeat/:saying/:number", function(req, res){

	var statement = '';

	for(var i=0; i<Number(req.params.number); i++){
		statement += req.params.saying + " ";
	}

	res.send(statement);
})

	

app.get("*", function(req, res){
	console.log("User lost");
	res.send("What are you doing with your life?");
})

app.listen(port, ip, function(){
	console.log("Well connected!");
})