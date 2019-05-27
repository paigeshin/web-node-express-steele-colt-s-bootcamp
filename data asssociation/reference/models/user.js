var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post" //=>아마 이 코드가 위에 정의해 놓은 Post(model) 를 의미하는 듯 하다. (참조)
    }
  ]
});
var User = mongoose.model("User", userSchema);
module.exports = User; //파일이 리턴하는 값으로 생각하면 편하다.
