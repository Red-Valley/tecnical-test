const roomSchema = require("../../models/room");
const { ServiceResultHandling } = require("../../utils/helper");
const { STATUS_CODE } = require("../../utils/constants");

const createRoomService = async ({ room_name, user_id }) => {
  try {
    const payload = {
      created_by: user_id,
      room_name: room_name,
    };
    const room = await roomSchema.create({ ...payload });
    return {
      statusCode: STATUS_CODE.CREATED,
      result: {
        ...payload,
        id: room.id,
      },
    };
  } catch (error) {
    return {
      error: true,
      result: ServiceResultHandling.handleError("unable to create"),
      statusCode: STATUS_CODE.SERVER_ERROR,
    };
  }
};

const getRoomService = async ({ id }) => {
  try {
    const room = await roomSchema.findById(id, {
      cby: true,
      rn: true,
      _id: true,
    });
    return {
      statusCode: STATUS_CODE.OK,
      result: room,
    };
  } catch (error) {
    return {
      error: true,
      result: ServiceResultHandling.handleError("unexpected error"),
      statusCode: STATUS_CODE.SERVER_ERROR,
    };
  }
};

const listRoomsService = async ({ page = 0, limit = 10 }) => {
  try {
    const rooms = await roomSchema.find(
      {},
      {
        cby: true,
        rn: true,
        _id: true,
      },
      {
        skip: limit * page,
        limit,
        sort: { createdAt: 'desc' }
      }
    );
    return {
      statusCode: STATUS_CODE.OK,
      result: rooms,
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
  createRoomService,
  getRoomService,
  listRoomsService,
};
