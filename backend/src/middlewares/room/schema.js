const Joi = require("joi");

const getRoomSchema = Joi.object({
  id: Joi.string().required(),
});

const createRoomSchema = Joi.object({
  user_id: Joi.string(),
  room_name: Joi.string().min(1).max(15).required(),
});

const addMessageSchema = Joi.object({
  room_id: Joi.string().required(),
  user_id: Joi.string().required(),
  command: Joi.boolean().default(false),
  content: Joi.string().min(1).max(250).required(),
});

module.exports = {
  createRoomSchema,
  addMessageSchema,
  getRoomSchema,
};
