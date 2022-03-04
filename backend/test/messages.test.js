const { createUserService } = require("../src/services/user/userService");
const {
  listMessageService,
  sendMessageService,
} = require("../src/services/messages/messagesService");
const assert = require("assert");

describe("Messages suite", function () {
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
  });

  it("# should send a message", async function () {
    const payload = {
      user_id,
      content: "Lorem Ipsum is not simply random text.",
    };
    const { result } = await sendMessageService(payload);
    assert.notEqual(
      result.id,
      undefined,
      `coudn't store a message with this user id ${user_id}`
    );
  });

  it("# empty user isn't allowed", async function () {
    const payload = {
      user_id: "",
      content: 'Lorem Ipsum is not simply random text.',
    };
    const { result } = await sendMessageService(payload);
    assert.equal(
      result.id,
      undefined,
      `stored a message without user id`
    );
  });

  it("# long messages not allowed", async function () {
    const payload = {
      user_id,
      content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.',
    };
    const { result } = await sendMessageService(payload);
    assert.equal(
      result.id,
      undefined,
      `${user_id} stored a long message (which is not allowed)`
    );
  });

  it("# should send a message with command", async function () {
    const payload = {
      user_id,
      content: "https://i.imgur.com/3hvBo0n.gif",
      command: true
    };
    const { result } = await sendMessageService(payload);
    assert.notEqual(
      result.id,
      undefined,
      `${user_id} coudn't store a command message`
    );
  });

  it("# should list messages", async function () {
    const { result } = await listMessageService();
    assert.equal(
      result.length,
      2,
      `different messages quantity, expected: 2, received: ${result.length}`
    );
  });
});
