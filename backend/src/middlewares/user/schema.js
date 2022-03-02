const Joi = require("joi");

const createUserSchema = Joi.object({
  username: Joi.string().min(4).max(15).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,20}$")).required(),
  name: Joi.string().pattern(new RegExp("^[a-zA-Z\\s]{1,100}$")).required(),
});

const authenticateSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  authenticateSchema,
  createUserSchema,
};
