const bcrypt = require("bcrypt");
const userSchema = require("../../models/user");
const { AVATAR_URL } = require("../../../config");
const { ServiceResultHandling, SignUserToken } = require("../../utils/helper");
const { STATUS_CODE } = require("../../utils/constants");

const createUserService = async ({ username, password, name }) => {
  try {
    const photo = `${AVATAR_URL}?img=${Math.floor(
      Math.random() * (70 - 1) + 1
    )}`;
    const payload = {
      username,
      name,
      photo,
    };
    const user = await userSchema.create({
      ...payload,
      password,
    });
    const token = SignUserToken(user.id, username);
    user.t = token;
    user.save();

    return {
      statusCode: STATUS_CODE.CREATED,
      result: {
        ...payload,
        token,
        id: user.id,
      },
    };
  } catch (err) {
    return {
      error: true,
      result: ServiceResultHandling.handleError("unable to create"),
      statusCode: STATUS_CODE.SERVER_ERROR,
    };
  }
};

const authenticateService = async ({ username, password }) => {
  try {
    const user = await userSchema.findOne(
      {
        u: username,
      },
      { u: true, ph: true, n: true, _id: true, p: true, t: true }
    );
    if (user && bcrypt.compareSync(password, user.password)) {
      return {
        statusCode: STATUS_CODE.OK,
        result: {
          id: user.id,
          username,
          name: user.name,
          photo: user.photo,
          token: user.token
        },
      };
    }
    return {
      error: true,
      result: ServiceResultHandling.handleError("invalid credentials"),
      statusCode: STATUS_CODE.BAD_REQUEST,
    };
  } catch (err) {
    return {
      error: true,
      result: ServiceResultHandling.handleError("unexpected error"),
      statusCode: STATUS_CODE.SERVER_ERROR,
    };
  }
};

module.exports = {
  authenticateService,
  createUserService,
};
