/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app";

describe("USER API ROUTES", () => {
  const appTest = request.agent(app);

  it("/sign-in, should show the access token, user id, nickname", async (done) => {
    const res = await appTest.post("/api/user/sign-in").send({
      email: "testuser@gmail.com",
      password: "123456*",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("accessToken");
    done();
  });

  it("/sign-up shouldn't create a user that exist", async (done) => {
    const res = await appTest.post("/api/user/sign-up").send({
      email: "testuser@gmail.com",
      password: "123456*",
      rePassword: "123456*",
      nickname: "TestUser",
    });
    expect(res.statusCode).toEqual(409);
    done();
  });
});
