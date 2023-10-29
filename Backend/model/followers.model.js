import mongoose from "mongoose";

const followSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Array,
    required: true,
  },
});

const follower = mongoose.model("follower", followSchema);

export default follower;
