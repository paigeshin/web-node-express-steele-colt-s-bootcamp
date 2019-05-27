var express = require("express");
var app = express();

var request = require("request");
request("http://www.google.com", function(error, response, body) {
  if (error) {
    console.log("Something went wrong");
    console.log(error);
  } else {
    if (response.statusCode == 200) {
      //Things Worked! (response.statsCode => not found the error)
      //   console.log(body);
    }
  }
});

var sunrise = "";
var sunset = "";

request(
  "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today",
  function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(response.body);
      var parsedData = JSON.parse(response.body);
      sunrise = parsedData.results.sunrise;
      sunset = parsedData.results.sunset;
      console.log("sunrise: " + response.body);
      console.log("sunset: " + sunset);
    }
  }
);

app.get("/", function(request, response) {
  response.send(
    "<h1>Sunrise: " + sunrise + "</h1> <br>" + "<h1>Sunset: " + sunset + "</h1>"
  );
});

app.listen(3000, "127.0.0.1", function() {
  console.log("server has started");
});
