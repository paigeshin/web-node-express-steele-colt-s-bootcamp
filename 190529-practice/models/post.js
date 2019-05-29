var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    username: String,
    passport:  String
});

module.exports = mongoose.model("Post", postSchema);
