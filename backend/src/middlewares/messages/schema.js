const Joi = require("joi");

const sendMessageSchema = Joi.object({
  room_id: Joi.string().required(),
  user_id: Joi.string().required(),
  command: Joi.boolean().default(false),
  content: Joi.string().min(1).max(250).required(),
});

module.exports = {
  sendMessageSchema,
};
