import mongoose from "mongoose";
import profileData from "../model/completeProfile.model.js";
mongoose.connect(
  "mongodb://arsil8356:52331071@ac-dkqgs4t-shard-00-00.n5tug6e.mongodb.net:27017,ac-dkqgs4t-shard-00-01.n5tug6e.mongodb.net:27017,ac-dkqgs4t-shard-00-02.n5tug6e.mongodb.net:27017/?ssl=true&replicaSet=atlas-12ijnz-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const Profile = mongoose.model("profiles", {});
const Users = mongoose.model("users", {});
export const profileDetailsController = async (request, response) => {
  try {
    const data = await Profile.findOne({ email: request.params.email }).exec();
    response.status(200).json(data);
  } catch (error) {
    return response
      .status(401)
      .json({ message: `ERROR WHILE FETCHING CITIES => : ${error}` });
  }
};
export const updateProfileController = async (request, response) => {
  try {
    const allData = request?.body;
    console.log("BAC ALL : ", allData);
    const data = await profileData
      .findOneAndUpdate(
        { email: request.params.email },
        {
          $set: {
            username: allData.username,
            email: allData.email,
            phone: allData.phone,
            profile_pic: allData.profile_pic,
            Age: 999,
            Bio: allData.Bio,
            DateOfBirth: allData.DateOfBirth,
            Profession: allData.Profession,
            Country: allData.Country,
            City: allData.City,
            Gender: allData.Gender,
          },
        }
      )
      .exec();
    response.status(200).json(data);
  } catch (error) {
    return response
      .status(401)
      .json({ message: `ERROR WHILE FETCHING CITIES => : ${error}` });
  }
};

export const getAllProfilesController = async (request, response) => {
  try {
    const data = await Profile.find({}).exec();
    response.status(200).json(data);
  } catch (error) {
    return response
      .status(401)
      .json({ message: `ERROR WHILE FETCHING CITIES => : ${error}` });
  }
};

export const deleteController = async (request, response) => {
  try {
    await Profile.deleteOne({ email: request.params.email });
    await Users.deleteOne({ email: request.params.email });
    response.status(200).json({
      data: `Account deleted successfully`,
      status: true,
    });
  } catch (error) {
    return response
      .status(401)
      .json({ message: `ERROR WHILE FETCHING CITIES => : ${error}` });
  }
};
