var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose"); //왜 passport-local-mongoose여야지?

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose); //이 코드를 차례대로 설명하면, 단순하게 UserSchema에 module로 여러가지 함수가 들어있는 것을 추가하는 것이다.

module.exports = mongoose.model("User", UserSchema);
