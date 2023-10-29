import mongoose from "mongoose";

const userSignupSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("user", userSignupSchema);
export default user;
