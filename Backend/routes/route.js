import express from "express";
import { checkFollowController } from "../controller/checkFollowController.js";
import { citiesController } from "../controller/citiesController.js";
import { completeProfileController } from "../controller/completeProfileController.js";
import { countriesController } from "../controller/countriesController.js";
import {
  createPostController,
  postListController,
} from "../controller/createPostController.js";
import { followController } from "../controller/followController.js";
import { notifyController } from "../controller/notifyController.js";
import { professionController } from "../controller/professionController.js";
import {
  profileDetailsController,
  updateProfileController,
  deleteController,
  getAllProfilesController,
} from "../controller/profileDetailsController.js";
import { userSigninController } from "../controller/userSignin.controller.js";
import { userSignupController } from "../controller/userSignup.controller.js";
const router = express.Router();

router.post("/signup", userSignupController);
router.post("/signin", userSigninController);
router.post("/complete-profile", completeProfileController);
router.get("/professions", professionController);
router.get("/countries", countriesController);
router.get("/cities", citiesController);
router.get("/profile-details/:email", profileDetailsController);
router.put("/update-profile/:email", updateProfileController);
router.get("/profile-details", getAllProfilesController);
router.post("/follow", followController);
router.get("/check-follow/:email", checkFollowController);
router.post("/create-post", createPostController);
router.get("/post-list", postListController);
router.get("/send-notification", notifyController);
router.delete("/delete/:email", deleteController);
export default router;
