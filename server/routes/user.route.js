const express = require("express");
const userRouter = express.Router();
const {
  Register,
  Login,
  Logout,
  GetProfile,
} = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/authMiddleware");

userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.get("/logout", Logout);
userRouter.get("/profile", authenticate, GetProfile);

module.exports = userRouter;
