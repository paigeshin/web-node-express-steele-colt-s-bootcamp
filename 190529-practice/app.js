var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    expressSession = require("express-session"),
    connectFlash = require("connect-flash"),
    request = require("request");

mongoose.connect("mongodb://127.0.0.1/example_app", {
    useNewUrlParser: true
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(
    expressSession({
        secret: "Demon Application",
        resave: false,
        saveUninitialized: false
    })
);
app.use(connectFlash());

app.listen(3000, "127.0.0.1", function () {
    console.log("Server has started")
});