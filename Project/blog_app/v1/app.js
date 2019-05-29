var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

//Basic Setting
mongoose.connect("mongodb://127.0.0.1/restful_blog_app", {
  useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//Mongoose Model Config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});
var Blog = mongoose.model("Blog", blogSchema);

//root
app.get("/", function(req, res) {
  res.redirect("/blogs");
});

//Restful Routes index, new, create, show, edit, update, destroy
//index route - show all items
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log("Error!");
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});
//new route - show forms
app.get("/blogs/new", function(req, res) {
  res.render("new");
});
//create route
app.post("/blogs", function(req, res) {
  //sanitize => 이렇게 하면 유저가 body에 script 태그를 걸어도 작동하지 않는다.
  req.body.blog.title = req.sanitize(req.body.blog.title);
  req.body.blog.image = req.sanitize(req.body.blog.image);
  req.body.blog.body = req.sanitize(req.body.blog.body);
  //create blog
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
  //then, redirect to the index
});
//show route
app.get("/blogs/:id", function(req, res) {
  //find ID
  Blog.findById(req.params.id, function(error, foundBlog) {
    if (!error) {
      res.render("show", { blog: foundBlog });
    }
  });
});

// Edit Route
app.get("/blogs/:id/edit", function(req, res) {
  //find Id
  Blog.findById(req.params.id, function(error, foundBlog) {
    if (!error) {
      res.render("edit", { blog: foundBlog });
    } else {
      res.redirect("/blogs");
    }
  });
});

// Update Route
app.put("/blogs/:id", function(req, res) {
  req.body.blog.title = req.sanitize(req.body.blog.title);
  req.body.blog.image = req.sanitize(req.body.blog.image);
  req.body.blog.body = req.sanitize(req.body.blog.body);
  //Blog.findByIdAndUpdate()
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(
    error,
    updatedBlog
  ) {
    if (error) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

// Delete Route
app.delete("/blogs/:id", function(req, res) {
  Blog.findByIdAndRemove(req.params.id, req.body.blog, function(error) {
    if (error) {
      res.send("Something went wrong!");
    } else {
      res.redirect("/blogs");
    }
  });
});

app.listen(3000, "127.0.0.1", function() {
  console.log("Server is running");
});
