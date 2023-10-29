import Following from "../model/follow.model.js";
import Follower from "../model/followers.model.js";
export const followController = async (request, response) => {
  try {
    const existingFollower = await Following.findOne({
      email: request.body.email,
    });

    if (existingFollower) {
      // If the email already exists, push the new user into the followers array
      existingFollower.user.push(request.body.user);
      await existingFollower.save();

      response.status(201).json({
        message: `Now you are following ${request.body.user}`,
        user: existingFollower,
        status: true,
      });
    } else {
      const newFollower = new Following(request.body);
      await newFollower.save();
      response.status(201).json({
        message: `Now you are following ${request.body.user}`,
        user: newFollower,
        status: true,
      });
    }
    await otherUserFollowManage(request.body.user, request.body.email);
  } catch (error) {
    response.status(400).json({ message: error.message, status: false });
  }
};

const otherUserFollowManage = async (email, followerEmail) => {
  try {
    const existingFollower = await Follower.findOne({ email: email });

    if (existingFollower) {
      // If the email already exists, push the new user into the followers array
      existingFollower.user.push(followerEmail);
      await existingFollower.save();

      return {
        message: `${followerEmail} Started following you`,
        user: existingFollower,
        status: true,
      };
    } else {
      const newFollower = new Follower({ email, user: [followerEmail] });
      await newFollower.save();

      return {
        message: `${followerEmail} Started following you`,
        user: newFollower,
        status: true,
      };
    }
  } catch (error) {
    return {
      message: error.message,
      status: false,
    };
  }
};
