var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/blog_demo", { useNewUrlParser: true });
//one to many relationship demonstration.
//one user can have many posts.

// Post - title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String
});
var Post = mongoose.model("Post", postSchema);

// User - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  //이게 바로 embed!
  posts: [postSchema] //이게 바로 embed! => 어레이 형식으로 저장
});
//=====> 위에 정의된 것은 이런 모습이 될 것이다.
// {
//     email: "email@gmail.com",
//     name: "namepower",
//     posts: [
//         {title: "post1", content: "post1_content"}, {title:"post2",content: "post2_content"}, {title:"post3", content: "post3_content"}
//     ]
// }

var User = mongoose.model("User", userSchema);

var newUser = new User({
  email: "hermione@hogwarts.edu",
  name: "Hermione Granger"
});

//posts: [postSchema]가 어레이기 때문에 push를 사용할 수 있다.
newUser.posts.push({
  title: "How to bre polyjuice potion",
  content: "Just kidding. Go to potions class to learn it!"
});

// newUser.save(function(err, user) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

//retrieve information
User.findOne({ name: "Hermione Granger" }, function(err, user) {
  if (err) {
    console.log(err);
  } else {
    user.posts.push({
      title: "3 things I really hate",
      content: "Voldemort * 3"
    });
    user.save(function(err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});
