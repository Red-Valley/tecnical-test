const { HttpResponseHandling } = require("../../utils/helper");
const {
  listMessageService,
  sendMessageService,
} = require("../../services/messages/messagesService");

const listRoomMessages = async (req, res) => {
  const { page, limit } = req.query;

  const { result, statusCode } = await listMessageService({
    page,
    limit,
  });
  HttpResponseHandling[statusCode](res, result);
};

const sendMessage = async (req, res) => {
  const { user_id, content, command } = req.body;

  const { result, statusCode } = await sendMessageService({
    user_id,
    content,
    command,
  });
  HttpResponseHandling[statusCode](res, result);
};

module.exports = {
  listRoomMessages,
  sendMessage,
};
