import Profile from "../model/completeProfile.model.js";
export const completeProfileController = async (request, response) => {
  try {
    const emailAlreadyExist = await Profile.findOne({
      email: request.body.email,
    });
    if (emailAlreadyExist) {
      console.log("EXIST");
      response.status(401).json({ message: "Username already exist" });
    } else {
      const userProfile = new Profile(request.body);
      await userProfile.save();
      response.status(201).json({
        message: "Profile Created Successfully",
        profile: userProfile,
        status: true,
      });
    }
  } catch (error) {
    response.status(400).json({ message: error.message, status: false });
  }
};
