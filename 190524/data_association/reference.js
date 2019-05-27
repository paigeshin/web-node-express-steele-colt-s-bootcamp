var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/blog_demo", { userNewUrlParser: true });

//Referencing
var postSchema = new mongoose.Schema({
  title: String,
  content: String
});
var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});
var User = mongoose.model("User", userSchema);

// 유저를 db에 넣기
User.create({
  email: "bob@gmail.com",
  name: "Bob Belcher"
});

//포스트를 생성하고, 생성이 완료된 후에 특정한 유저의 posts 어레이에 추가하고 db에 저장하기.
// Post.create(
//   {
//     title: "How to cook the best burger. pt3",
//     content: "blah blah blah blah blah"
//   },
//   function(err, post) {
//     User.findOne({ email: "bob@gmail.com" }, function(err, foundUser) {
//       if (err) {
//         console.log(err);
//       } else {
//         foundUser.posts.push(post);
//         foundUser.save(function(err, data) {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(data);
//           }
//         });
//         //여기서 post는 Post.create가 방금 생성한 post
//       }
//     });
//   }
// );

User.findOne({ email: "bob@gmail.comm" })
  .populate("posts")
  .exec(function(err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
    }
  });
