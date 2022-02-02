const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
	{
		conversationId: String,
        sender: String,
        text: String   
	},
	{ timestamps: true }
);

module.exports = model('Message', MessageSchema);
