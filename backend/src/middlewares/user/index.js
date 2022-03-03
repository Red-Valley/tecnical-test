const { authenticateSchema, createUserSchema } = require("./schema");
const { STATUS_CODE } = require("../../utils/constants");
const { HttpResponseHandling } = require("../../utils/helper");

const checkAuthenticationFields = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    await authenticateSchema.validateAsync({
      username,
      password,
    });
    next();
  } catch (error) {
    return HttpResponseHandling[STATUS_CODE.BAD_REQUEST](res, error.message);
  }
};

const checkUserFields = async (req, res, next) => {
  const { username, password, name } = req.body;
  try {
    await createUserSchema.validateAsync({
      username,
      password,
      name,
    });
    next();
  } catch (error) {
    return HttpResponseHandling[STATUS_CODE.BAD_REQUEST](res, error.message);
  }
};

module.exports = {
  checkAuthenticationFields,
  checkUserFields,
};
