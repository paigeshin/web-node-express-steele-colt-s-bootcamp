var mongoose = require("mongoose");

var journalSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});
var Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
