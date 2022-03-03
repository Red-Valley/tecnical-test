const userMiddleware = require('./user');
const roomMiddleware = require('./room');
const messagesMiddleware = require('./messages');

module.exports = {
    userMiddleware,
    roomMiddleware,
    messagesMiddleware,
}