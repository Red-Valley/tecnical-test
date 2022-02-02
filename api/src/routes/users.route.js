const User = require("../models/user.model");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { userUpdate, userDelete, userGet, userFollow } = require("../controllers/user.controller");

//update user
router.put("/", userUpdate);

//delete user
router.delete("/", userDelete);

//get a user
router.get("/", userGet);


//follow a user

router.put("/follow", userFollow);

module.exports = router;