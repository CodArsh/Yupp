import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  dp: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postPic: {
    type: String,
    required: true,
  },
});

const post = mongoose.model("post", postSchema);
export default post;
