const router = require("express").Router();

const { roomMiddleware } = require("../../middlewares");
const { roomController } = require("../../controllers");

router.get("/", roomController.listRooms);
router.get("/:id", roomMiddleware.getRoomFields, roomController.getRoom);
router.post("/create", roomMiddleware.checkRoomFields, roomController.createRoom);
// router.post("/send_message", roomMiddleware.checkMessageFields, roomController);

module.exports = router;
