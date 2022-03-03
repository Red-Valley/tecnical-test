const { createUserService } = require("../src/services/user/userService");
const { createRoomService } = require("../src/services/room/roomService");
const {
  listMessageService,
  sendMessageService,
} = require("../src/services/messages/messagesService");
const assert = require("assert");

describe("Messages suite", function () {
  let room_id;
  let user_id;
  before(async function () {
    require("../src/loaders/database")();

    // create a test user in order to create messages
    const { result: userResult } = await createUserService({
      username: "the_test",
      password: "user12345",
      name: "mock user",
    });
    user_id = userResult.id;

    // create a test room
    const { result: roomResult } = await createRoomService({
      room_name: "mock room",
    });
    room_id = roomResult.id;
  });

  it("# should send a message to room", async function () {
    const payload = {
      room_id,
      user_id,
      content: "Lorem Ipsum is not simply random text.",
    };
    const { result } = await sendMessageService(payload);
    assert.notEqual(
      result.id,
      undefined,
      `coudn't store a message in the room ${room_id}`
    );
  });

  it("# empty room and/or user aren't allowed", async function () {
    const payload = {
      room_id: "",
      user_id: "",
      content: 'Lorem Ipsum is not simply random text.',
    };
    const { result } = await sendMessageService(payload);
    assert.equal(
      result.id,
      undefined,
      `stored a message without room id nor user id`
    );
  });

  it("# long messages not allowed", async function () {
    const payload = {
      room_id,
      user_id,
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.',
    };
    const { result } = await sendMessageService(payload);
    assert.equal(
      result.id,
      undefined,
      `stored a long message in the room ${room_id} (which is not allowed)`
    );
  });

  it("# should send a message with command to room", async function () {
    const payload = {
      room_id,
      user_id,
      content: "https://i.imgur.com/3hvBo0n.gif",
      command: true
    };
    const { result } = await sendMessageService(payload);
    assert.notEqual(
      result.id,
      undefined,
      `coudn't store a command message in the room ${room_id}`
    );
  });

  it("# should list room messages", async function () {
    const { result } = await listMessageService({ room_id });
    assert.equal(
      result.length,
      2,
      `seems that this room ${room_id} has no messages in it`
    );
  });
});
