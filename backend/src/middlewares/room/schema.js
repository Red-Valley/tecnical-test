const Joi = require("joi");

const getRoomSchema = Joi.object({
  id: Joi.string().required(),
});

const createRoomSchema = Joi.object({
  user_id: Joi.string(),
  room_name: Joi.string().min(1).max(15).required(),
});

module.exports = {
  createRoomSchema,
  getRoomSchema,
};
