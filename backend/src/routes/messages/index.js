const router = require("express").Router();

const { messagesController } = require("../../controllers");
const { verifyToken } = require("../../middlewares/user");

router.get("/", verifyToken, messagesController.listRoomMessages);

module.exports = router;