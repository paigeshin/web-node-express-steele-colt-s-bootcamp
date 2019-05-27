import { Mongoose } from "mongoose";

var userSchema = new Mongoose.Schema({
  email: String,
  name: String,
  posts: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});
