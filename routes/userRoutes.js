// import express from "express";
// import {
//   registerUser,
//   verifyOtp,
//   sendOtp,
//   loginUser,
//   getUserProfile,
// } from "../controllers/userController.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/send-otp", sendOtp);
// router.post("/verify-otp", verifyOtp);
// router.post("/login", loginUser);
// router.get("/profile", getUserProfile);

// export default router;

import { Router } from "express";
import {
  register,
  sendOtp,
  verifyOtp,
  login,
} from "../controllers/userController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
