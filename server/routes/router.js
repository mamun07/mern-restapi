import express from "express";
import * as controller from "../controllers/loginController.js";

const router = express.Router();

// API Home Routing
router.get("/", (req, res) => {
  res.send("Welcome to MERN Restfull API");
});

// POST Routing
router.route("/register").post(controller.registerUser); // Register User
// router.route("/registerMail").post(); // Send the email
router.route("/authenticate").post((req, res) => res.end()); // Authenticate User
router.route("/login").post(controller.verifyUser, controller.loginUser); // Login in app

// GET Routing
router.route("/user/:username").get(controller.getUser); // user with username
router.route("/generateOTP").get(controller.generateOTP); // generate random OTP
router.route("/verifyOTP").get(controller.verifyOTP); // verify generate OTP
router.route("/createResetSession").get(); // reset all the variables

// PUT Routing
router.route("/updateuser").put(controller.updateUser); // is use to update the user profile
router.route("/resetPassword").put(); // use to reset password

// DELETE Routing
router.route("/user/:username/delete").delete(controller.deleteUser); // Use to delete the user

export default router;
