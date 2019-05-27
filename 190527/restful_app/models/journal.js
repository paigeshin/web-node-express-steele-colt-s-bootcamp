var mongoose = require("mongoose");

//Mongoose Model Config
var journalSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Journal", journalSchema);
