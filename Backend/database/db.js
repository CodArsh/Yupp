import mongoose from "mongoose";
export const Connection = async (username, password) => {
  const URL = `mongodb://arsil8356:52331071@ac-dkqgs4t-shard-00-00.n5tug6e.mongodb.net:27017,ac-dkqgs4t-shard-00-01.n5tug6e.mongodb.net:27017,ac-dkqgs4t-shard-00-02.n5tug6e.mongodb.net:27017/?ssl=true&replicaSet=atlas-12ijnz-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  } catch (err) {
    console.log("ERROR WHILE CONNECTING WITH DATABASE => ", err.message);
  }
};