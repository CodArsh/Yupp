import mongoose from "mongoose";

const completeProfileSchema = mongoose.Schema({
  username: {
    type: String,
    required: false,
    trim: true,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  profile_pic: {
    type: Object,
    required: false,
  },
  DateOfBirth: {
    type: String,
    required: false,
  },
  Age: {
    type: Number,
    required: false,
  },
  Profession: {
    type: String,
    required: false,
  },
  Bio: {
    type: String,
    required: false,
  },
  Gender: {
    type: String,
    required: false,
  },
  City: {
    type: String,
    required: false,
  },
  Country: {
    type: String,
    required: false,
  },
});

const profile = mongoose.model("profile", completeProfileSchema);
export default profile;
