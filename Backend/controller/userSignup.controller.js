import User from "../model/userSignup.model.js";

export const userSignupController = async (request, response) => {
  try {
    const usernameAlreadyExist = await User.findOne({
      email: request.body.email,
    });
    if (usernameAlreadyExist) {
      return response
        .status(401)
        .json({ message: "This email is already exist", status: false });
    }
    const newUser = new User(request.body);
    await newUser.save();
    response
      .status(201)
      .json({ message: "Signup successfull", user: newUser, status: true });
  } catch (error) {
    response.status(400).json({ message: error.message, status: false });
  }
};
