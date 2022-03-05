const jwt = require("jsonwebtoken");
const { authenticateSchema, createUserSchema } = require("./schema");
const { STATUS_CODE } = require("../../utils/constants");
const { HttpResponseHandling } = require("../../utils/helper");
const { JWT_SECRET } = require("../../../config");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return HttpResponseHandling[STATUS_CODE.FORBIDDEN](res, "token required");
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return HttpResponseHandling[STATUS_CODE.UNAUTHORIZED](res, "unauthorized");
  }
  return next();
};

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
  verifyToken,
  checkAuthenticationFields,
  checkUserFields,
};
