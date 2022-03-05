const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

const { STATUS_CODE } = require("./constants");

const HttpResponseHandling = {
  [STATUS_CODE.OK]: (res, data) => res.status(STATUS_CODE.OK).json(data),
  [STATUS_CODE.CREATED]: (res, data) =>
    res.status(STATUS_CODE.CREATED).json(data),
  [STATUS_CODE.FORBIDDEN]: (res, message) =>
    res.status(STATUS_CODE.FORBIDDEN).json({ error: true, message }),
  [STATUS_CODE.BAD_REQUEST]: (res, message) =>
    res.status(STATUS_CODE.BAD_REQUEST).json({ error: true, message }),
  [STATUS_CODE.SERVER_ERROR]: (res, message) =>
    res.status(STATUS_CODE.SERVER_ERROR).json({ error: true, message }),
};

const ServiceResultHandling = {
  handleError: (result) => ({ error: true, result }),
};

const SignUserToken = (user_id, username, expiresIn = "1y") =>
  jwt.sign({ user_id, username }, JWT_SECRET, { expiresIn });

module.exports = {
  HttpResponseHandling,
  ServiceResultHandling,
  SignUserToken,
};
