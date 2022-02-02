const router = require("express").Router();
const { newConversation, findConversation } = require('../controllers/conversation.controller')

//POST
router.post("/", newConversation);

//GET
router.get("/", findConversation);

module.exports = router;