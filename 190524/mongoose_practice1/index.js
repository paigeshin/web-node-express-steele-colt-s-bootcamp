var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/cat_app", { useNewUrlParser: true });

//not 'table' but 'pattern' or 'structure'
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

Cat.find({}, function(err, itemReturned) {
  if (err) {
    console.log("Oh No, Error! else ");
  } else {
    console.log(itemReturned);
  }
});

Cat.create(
  {
    name: "Snow White",
    age: 15,
    temperament: "Bland"
  },
  function(err, itemReturned) {
    if (err) {
      console.log(err);
    } else {
      console.log(itemReturned);
    }
  }
);
