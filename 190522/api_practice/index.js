var express = require("express");
var app = express();

var request = require("request");

app.get("/", function(req, res) {
  request(
    "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400",
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var info = JSON.parse(body);
        res.send("<h1>" + "Sunrise : " + info["results"]["sunrise"] + "</h1>");
      }
    }
  );
});

app.listen(3000, "127.0.0.1", function() {
  console.log("Server has started");
});
