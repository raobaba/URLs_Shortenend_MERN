const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Email does not exist" });
    }
    const user = await User.findOne({ email });
    const generateToken = (user) => {
      return jwt.sign(
        { _id: user._id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
    };

    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user);
      res.json({user, token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const Logout = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);  // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  Register,
  Login,
  Logout,
};
