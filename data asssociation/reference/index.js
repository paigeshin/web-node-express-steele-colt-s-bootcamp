var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/blog_demo_2", { useNewUrlParser: true });

var Post = require("./models/post"); //이런 식으로 import하면 된다. 자바에서 class model들을 import하는 것을 상기하자.
var User = require("./models/user");

//유저를 db에 넣기
// User.create({
//   email: "bob@gmail.com",
//   name: "Bob Belcher"
// });

//포스트를 생성하고, 생성이 완료된 후에 특정한 유저의 posts 어레이에 추가하고 db에 저장하기.
Post.create(
  {
    title: "How to cook the best burger. pt4",
    content: "blah blah blah blah blah"
  },
  function(err, post) {
    User.findOne({ email: "bob@gmail.com" }, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        foundUser.posts.push(post);
        foundUser.save(function(err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
        //여기서 post는 Post.create가 방금 생성한 post
      }
    });
  }
);

//Find User
//find all posts for that user

User.findOne({ email: "bob@gmail.com" })
  .populate("posts") //populate하면 계속 loop를 돌며 찾아주나보다.
  .exec(function(err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
    }
  });
