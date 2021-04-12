/* eslint-disable no-undef */
import request from "supertest";
import app from "../../app";

describe("MESSAGES API ROUTES", () => {
  const appTest = request.agent(app);

  it("/all/:nickname, should contain a message from interlocutor", async (done) => {
    const res = await appTest.get(`/api/messages/all/testUser`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          interlocutor: true,
          message: `Welcome testUser`,
        }),
      ])
    );
    done();
  });
});
