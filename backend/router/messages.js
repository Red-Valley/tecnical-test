const { Router } = require("express");
const { getMessages } = require("../controllers/messages");
const { validateJwt } = require("../middlewares/validateJwt");
const router = Router();

router.get("/:from", validateJwt, getMessages);

module.exports = router;
