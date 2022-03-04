const router = require("express").Router();

// const { messagesMiddleware } = require("../../middlewares");
const { messagesController } = require("../../controllers");

router.get("/", messagesController.listRoomMessages);
// router.get("/:room_id/send", messagesMiddleware.checkMessageFields, messagesController.sendMessage);

module.exports = router;