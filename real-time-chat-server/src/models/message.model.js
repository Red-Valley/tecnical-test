const mongoose = require('mongoose');
const ChatSchema = new mongoose.Schema({
    author: String,
    message: String,
    create_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Menssage',ChatSchema)