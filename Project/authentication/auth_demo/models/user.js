//1-passport
var mongoose = require("mongoose");
//1-passport: pass passport-local-mongoose to our user model.
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});
//1-passport: pass passport-local-mongoose to our user model.
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
