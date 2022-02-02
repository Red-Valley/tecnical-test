const { register, login } = require("../controllers/auth.controller");
const messageModel = require("../models/message.model");
const router = require("express").Router();

//ADD
router.post("/", async(req, res, next)=>{
    try {
        const newMessage = new messageModel({...req.body})
        await newMessage.save()
        res.status(200).json(newMessage)
    } catch (error) {
        res.send(error)
    }
});

//GET
router.get("/:conversationId", async(req, res, next)=>{
    try {
        const messages = await messageModel.find({
            conversationId: req.params.conversationId
        })
        res.json(messages)
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;