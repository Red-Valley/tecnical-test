const {
  createUserService,
  authenticateService,
  getUserProfileService,
} = require("../src/services/user/userService");
const assert = require("assert");

describe("User suite", function () {
  let connection;
  let user;
  before(function () {
    connection = require("../src/loaders/database")();
  });

  after(function () {
    connection.dropDatabase();
  });

  it("# should create a user", async function () {
    const userPayload = {
      username: "test_user1",
      password: "test12345",
      name: "mock user",
    };
    const { result } = await createUserService(userPayload);
    user = result;
    assert.notEqual(result.id, undefined, "unable to create this user");
    assert.notEqual(result.token, undefined, "the usar lacks of token");
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

  it("# prevents duplicated username", async function () {
    const userPayload = {
      username: "test_user1",
      password: "test12345",
      name: "mock user",
    };
    const { error } = await createUserService(userPayload);
    assert.strictEqual(error, true, `${userPayload.username} already in use`);
  });

  it("# able to authenticate", async function () {
    const userPayload = {
      username: "test_user1",
      password: "test12345",
    };

    const { result } = await authenticateService(userPayload);

    assert.notEqual(result.id, undefined, "username not match or is empty");
  });

  it("# unable to authenticate with wrong credentials", async function () {
    const userPayload = {
      username: "test_user1",
      password: "test123451",
    };

    const { error } = await authenticateService(userPayload);

    assert.strictEqual(
      error,
      true,
      "invalid credentials were received as valid"
    );
  });

  it("# return a profile using `user_id`", async function () {
    const { result } = await getUserProfileService({ user_id: user.id });

    assert.equal(result.id, user.id, "id doesn't match");
    assert.equal(result.username, user.username, "username doesn't match");
    assert.equal(result.token, user.token, "token doesn't match");
  });

  it("# return an error using an invalid `user_id`", async function () {
    const { result } = await getUserProfileService({ user_id: "FAKE_ID" });
    assert.equal(result.id, undefined, "found an unexisting user!!??");
  });
});
