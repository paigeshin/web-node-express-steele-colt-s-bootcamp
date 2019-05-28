var mongoose = require("mongoose");

var photoSchema = new mongoose.Schema({
  title: String,
  image: String
});

module.exports = mongoose.model("Photo", photoSchema);
