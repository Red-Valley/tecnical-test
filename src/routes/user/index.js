const router = require("express").Router();

const { userMiddleware } = require("../../middlewares");
const { userController } = require("../../controllers");

router.post("/", userMiddleware.checkUserFields, userController.createUser);
router.post("/signin", userMiddleware.checkAuthenticationFields, userController.authenticate);
router.post("/profile", userMiddleware.verifyToken, userController.getUserProfile);

module.exports = router;
