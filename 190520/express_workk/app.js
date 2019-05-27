var express = require("express");
var app = express();

app.get("/speak/:animal", function(req, res) {
  var animal = req.params.animal;
  var sound = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof Woof!"
  };
  res.send(sound[animal]);
});

app.get("/repeat/:word/:num", function(req, res) {
  var iteration = req.params.num;
  var words = "";
  for (var i = 0; i < iteration; i++) {
    words += req.params.word + " ";
  }
  res.send(words);
});

app.get("*", function(req, res) {
  res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(3000, "127.0.0.1", function() {
  console.log("Server has started");
});
