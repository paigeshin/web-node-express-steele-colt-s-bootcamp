var express = require("express");
var request = require("request");
var app = express();

app.get("/", function(req, res) {
  request(
    "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today",
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var datas = JSON.parse(body);
        var sunrise = datas["results"]["sunrise"];
        var sunset = datas["results"]["sunset"];
        res.send(
          "<h1> Sunrise : " +
            sunrise +
            "</h1>" +
            "\n" +
            "<h1> Sunset : " +
            sunset +
            "</h1>"
        );
      }
    }
  );
});

app.listen(3000, "127.0.0.1", function() {
  console.log("Our server has started");
});
