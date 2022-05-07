const { Router } = require("express");
const { createUser, login, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateJwt } = require("../middlewares/validateJwt");

const router = Router();

// Use to create users
router.post(
  "/register",
  [
    check("name", "The name is required").not().isEmpty(),
    check("password", "The password is required").not().isEmpty(),
    check("email", "The email is required").isEmail(),
    validateFields,
  ],
  createUser
);

// Login
router.post(
  "/",
  [
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

// Validate token
router.get("/renew", validateJwt, renewToken);

module.exports = router;
