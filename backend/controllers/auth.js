const response = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    // Validate email
    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return res.status(400).json({
        msg: "The email isn't available",
      });
    }

    const user = new User(req.body);
    //Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    //Save user in DB
    await user.save();

    //Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
      success: true,
    });
  } catch (error) {
    res.status(500);
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify the email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, msg: "Email not found" });
    }

    // Verify the password
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(404).json({
        success: false,
        msg: "Wrong credentials",
      });
    }

    // Generate jwt
    const token = await generateJWT(user.id);

    res.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500);
  }
};

const renewToken = async (req, res = response) => {
  const { uid } = req;

  // Generate a new token
  const token = await generateJWT(uid);

  // Get user by uid
  const user = await User.findById(uid);

  res.json({
    success: true,
    user,
    token,
  });
};

module.exports = {
  createUser,
  login,
  renewToken,
};
