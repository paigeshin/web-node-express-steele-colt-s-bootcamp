var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
  title: String,
  content: String
});

var Post = mongoose.model("Post", postSchema);
module.exports = Post; //파일이 리턴하는 값으로 생각하면 편하다.
