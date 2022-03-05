const { sendMessageSchema } = require("./schema");
const { STATUS_CODE } = require("../../utils/constants");
const { HttpResponseHandling } = require("../../utils/helper");

const checkMessageFields = async (req, res, next) => {
  const { room_id } = req.params;
  const { user_id, command, content } = req.body;
  try {
    await sendMessageSchema.validateAsync({
      room_id,
      user_id,
      command,
      content,
    });
    next();
  } catch (error) {
    return HttpResponseHandling[STATUS_CODE.BAD_REQUEST](res, error.message);
  }
};

module.exports = {
  checkMessageFields,
};
