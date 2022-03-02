const {
  createUserService,
  authenticateService,
} = require("../src/services/user/userService");
const assert = require("assert");

describe("User suite", function () {
  before(function () {
    const connection = require("../src/loaders/database")();
    connection.dropDatabase();
  });

  it("# prevents empty username & password", async function () {
    let userPayload = {
      username: "",
      password: "",
      name: "mock user",
    };
    const { error } = await createUserService(userPayload);
    assert.strictEqual(error, true, "username is empty");

    userPayload = { ...userPayload, username: "test_user" };
    const { error: secError } = await createUserService(userPayload);
    assert.strictEqual(secError, true, "password is empty");
  });

  it("# should create a user", async function () {
    const userPayload = {
      username: "test_user1",
      password: "test12345",
      name: "mock user",
    };

    const { result } = await createUserService(userPayload);
    assert.notEqual(
      result.id,
      undefined,
      "username not match or it's empty"
    );
  });

  it("# prevents duplicated username", async function () {
    const userPayload = {
      username: "test_user1",
      password: "test12345",
      name: "mock user",
    };

    const { error } = await createUserService(userPayload);

    assert.strictEqual(error, true, "username has duplicated key");
  });

  it("# able to authenticate", async function () {
    const userPayload = {
      username: "test_user1",
      password: "test12345",
    };

    const { result } = await authenticateService(userPayload);

    assert.notEqual(
      result.id,
      undefined,
      "username not match or it's empty"
    );
  });

  it("# unable to authenticate", async function () {
    const userPayload = {
      username: "test_user1",
      password: "test123451",
    };

    const { error } = await authenticateService(userPayload);

    assert.strictEqual(error, true, "invalid credentials were received as valid");
  });
});
