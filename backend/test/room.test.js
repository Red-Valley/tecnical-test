const {
  createRoomService,
  listRoomsService,
  getRoomService,
} = require("../src/services/room/roomService");
const assert = require("assert");

describe("Room suite", function () {
  before(function () {
    require("../src/loaders/database")();
  });

  let room;
  it("# should create a room", async function () {
    const roomPayload = {
      room_name: "mock room",
    };

    const { result } = await createRoomService(roomPayload);
    room = result.id;
    assert.notEqual(result.id, undefined, "unable to create room");
  });

  it("# retrieve the second created room", async function () {
    const roomPayload = {
      room_name: "mock room 2",
    };

    await createRoomService(roomPayload);

    const { result } = await listRoomsService({ page: 1, limit: 1 });
    assert.equal(result.length, 1, "empty list of rooms");
  });

  it("# retrieve the first created room", async function () {
    const { result } = await getRoomService({ id: room });
    assert.notEqual(
      result.id,
      undefined,
      `the room with id ${room} does not exist`
    );
  });
});
