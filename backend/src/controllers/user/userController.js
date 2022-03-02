const { HttpResponseHandling } = require("../../utils/helper");
const {
  createUserService,
  authenticateService,
} = require("../../services/user/userService");

const createUser = async (req, res) => {
  const { result, statusCode } = await createUserService({...req.body});
  HttpResponseHandling[statusCode](res, result);
};

const authenticate = async (req, res) => {
  const { result, statusCode } = await authenticateService({...req.body});
  HttpResponseHandling[statusCode](res, result);
};

module.exports = {
  authenticate,
  createUser,
};
