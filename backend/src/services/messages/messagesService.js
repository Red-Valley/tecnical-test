const messagesSchema = require("../../models/messages");
const userSchema = require("../../models/user");
const { ServiceResultHandling } = require("../../utils/helper");
const { STATUS_CODE } = require("../../utils/constants");

const listMessageService = async ({ page = 0, limit = 15 } = {}) => {
  try {
    const messages = await messagesSchema
      .find(
        {},
        {
          createdAt: true,
          uid: true,
          cmd: true,
          c: true,
          _id: true,
        },
        {
          skip: limit * page,
          limit,
          sort: { createdAt: "desc" },
        }
      )
      .populate("uid", { _id: true, u: true, ph: true });
    return {
      statusCode: STATUS_CODE.OK,
      result: messages,
    };
  } catch (error) {
    return {
      error: true,
      result: ServiceResultHandling.handleError("unexpected error"),
      statusCode: STATUS_CODE.SERVER_ERROR,
    };
  }
};

const sendMessageService = async ({ user_id, content, command = false }) => {
  try {
    const payload = { user: user_id, content, command };
    const message = await messagesSchema.create({
      ...payload,
    });
    const messageOwner = await userSchema.findById(user_id, {
      _id: true,
      u: true,
      ph: true,
    });
    return {
      statusCode: STATUS_CODE.OK,
      result: {
        ...payload,
        user: { ...messageOwner },
        id: message.id,
        createdAt: message.createdAt,
      },
    };
  } catch (error) {
    return {
      error: true,
      result: ServiceResultHandling.handleError("unexpected error"),
      statusCode: STATUS_CODE.SERVER_ERROR,
    };
  }
};

module.exports = {
  listMessageService,
  sendMessageService,
};
