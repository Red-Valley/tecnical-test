const MessageModel = require('../models/message.model');

const Message={
    create:async(author,message) => {
        const messageData= new MessageModel({
            author,
            message
        });
        const newMessage = await messageData.save();
        return newMessage;
    },
    getAll:async()=>{
        return await MessageModel.find({});
    }
}

module.exports = Message;