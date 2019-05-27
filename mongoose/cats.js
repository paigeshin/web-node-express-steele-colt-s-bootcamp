//Mongo Setup
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/cat_app", { useNewUrlParser: true });

//not 'table' but 'pattern' or 'structure'
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

//위에 정의 해놓은 structure가 Cat이라는 변수에 모델로 저장됨. "Cat" => Cat이라는 collection이 추가된다.
var Cat = mongoose.model("Cat", catSchema); //model은 보통 관습적으로 대문자 C

//위에 var Cat로 변수로 저장했기에 아래와 같은 syntax가 가능해진다.
// Cat.find();
// Cat.remove();

// //adding a new cat to the DB - 데이터 정의
// var george = new Cat({
//   name: "George",
//   age: 11,
//   temperament: "Grouchy"
// });

// //db에 저장하기
// george.save(function(err, itemReturned) {
//   if (err) {
//     console.log("Something went wrong");
//   } else {
//     console.log("We just saved a cat to the DB:");
//     console.log(itemReturned);
//   }
// });

Cat.find({}, function(err, itemsReturned) {
  if (err) {
    console.log("Oh No,, ERROR!");
    console.log(err);
  } else {
    console.log("ALl THE CATS.... ");
    console.log(itemsReturned);
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

//만들기
// george.create()
//지우기
// george.remove()

//retrieve all cats from the DB and console.log each one
