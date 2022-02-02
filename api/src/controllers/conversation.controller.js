require('dotenv').config();
const jwt = require('jsonwebtoken');
const conversationModel = require('../models/conversation.model');
const messageModel = require('../models/message.model');

const newConversation = async (req, res, next) => {
	const { token } = req.headers;
	const { receiverId } = req.body;
	try {
		const { id } = jwt.verify(token, process.env.SECRET_KEY);
		let existConversation = await conversationModel.find({members: { $in:[id]}})
		existConversation = existConversation.filter(e=>e.members.some(p=>p === receiverId))
		if(existConversation.length) return res.status(200).json(existConversation);
		const newConversation = new conversationModel({
			members: [ id, receiverId ]
		});
		await newConversation.save();
		res.status(200).json(newConversation);
	} catch (error) {
		res.send(error);
	}
};

const findConversation = async (req, res, next) => {
	const { token } = req.headers;
	try {
		const { id } = jwt.verify(token, process.env.SECRET_KEY);
		const conversation_ = await conversationModel.find({members: { $in:[id] }})
		const resultado = []
		for(let c of conversation_){
			const messages = await messageModel.find({conversationId: c._id}).sort({createdAt: -1})  
			resultado.push({...c._doc, message:messages.length?messages[0]:{text: "Send a message to init a conversation...", sender:c._doc.members[1], createdAt:c._doc.createdAt}})
		}
		res.status(200).json(resultado);
	} catch (error) {
		res.send(error);
	}
};

module.exports = {
	newConversation,
	findConversation
};
