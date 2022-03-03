const { HttpResponseHandling } = require("../../utils/helper");
const {
  createRoomService,
  listRoomsService,
  getRoomService,
} = require("../../services/room/roomService");

const getRoom = async (req, res) => {
  const { result, statusCode } = await getRoomService({ ...req.params });
  HttpResponseHandling[statusCode](res, result);
};

const listRooms = async (req, res) => {
  const { result, statusCode } = await listRoomsService({ ...req.query });
  HttpResponseHandling[statusCode](res, result);
};

const createRoom = async (req, res) => {
  const { result, statusCode } = await createRoomService({ ...req.body });
  HttpResponseHandling[statusCode](res, result);
};

module.exports = {
  getRoom,
  listRooms,
  createRoom,
};
