const { register, login, verifyToken } = require("../controllers/auth.controller");
const router = require("express").Router();

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

//VERIFY
router.get("/", verifyToken)

module.exports = router;