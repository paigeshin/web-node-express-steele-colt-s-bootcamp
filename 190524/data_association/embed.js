var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/blog_demo");

var postSchema = new mongoose.Schema({
  title: String,
  content: String
});
var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema] 
  });

  var User = mongoose.model("User", userSchema);