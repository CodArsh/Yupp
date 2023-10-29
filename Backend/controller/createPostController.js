import mongoose from "mongoose";
import Post from "../model/postController.model.js";
export const createPostController = async (request, response) => {
  try {
    const newPost = new Post(request.body);
    await newPost.save();
    response.status(201).json({
      message: "Post Created Successfully",
      profile: newPost,
      status: true,
    });
  } catch (error) {
    response.status(400).json({ message: error.message, status: false });
  }
};

mongoose.connect(
  "mongodb://arsil8356:52331071@ac-dkqgs4t-shard-00-00.n5tug6e.mongodb.net:27017,ac-dkqgs4t-shard-00-01.n5tug6e.mongodb.net:27017,ac-dkqgs4t-shard-00-02.n5tug6e.mongodb.net:27017/?ssl=true&replicaSet=atlas-12ijnz-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const Posts = mongoose.model("posts", {});
export const postListController = async (request, response) => {
  try {
    const data = await Posts.find({}).exec();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ message: error.message, status: false });
  }
};
