import express from "express";
import {
  getUser,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/loginController.js";

const router = express.Router();

// API Home Routing
router.get("/", (req, res) => {
  res.send("Welcome to MERN restfull API");
});

// User Routing
router.route("/user").get(getUser).post(postUser);
router.route("/user/:id").put(putUser).delete(deleteUser);

export default router;
