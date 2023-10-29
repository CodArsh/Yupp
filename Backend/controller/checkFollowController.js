import mongoose from "mongoose";

mongoose.connect(
  "mongodb://arsil8356:52331071@ac-dkqgs4t-shard-00-00.n5tug6e.mongodb.net:27017,ac-dkqgs4t-shard-00-01.n5tug6e.mongodb.net:27017,ac-dkqgs4t-shard-00-02.n5tug6e.mongodb.net:27017/?ssl=true&replicaSet=atlas-12ijnz-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const Following = mongoose.model("followings", {});
export const checkFollowController = async (request, response) => {
    try {
    const data = await Following.findOne({ email: request.params.email }).exec();
    response.status(200).json(data);
  } catch (error) {
    return response
      .status(401)
      .json({ message: `ERROR WHILE FETCHING CITIES => : ${error}` });
  }
};
