import User from "../model/userSignup.model.js";

export const userSigninController = async (request, response) => {
  try {
    const email = request.body.email;
    let userData = await User.findOne({ email: email });
    if (userData) {
      if (userData.password == request.body.password) {
        response
          .status(200)
          .json({
            message: "Signin successfull",
            user: userData,
            status: true,
          });
      } else {
        response
          .status(401)
          .json({ message: "Oops ! Wrong password", status: false });
      }
    } else {
      response.status(400).json({ message: "User not found", status: false });
    }
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
