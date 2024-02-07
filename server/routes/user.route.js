const express = require("express");
const userRouter = express.Router();
const { Register, Login, Logout } = require("../controllers/user.controller");
const { authenticate, getProfile } = require("../middlewares/authMiddleware");

userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.get("/logout", Logout);
userRouter.get("/profile", authenticate, getProfile);

module.exports = userRouter;
