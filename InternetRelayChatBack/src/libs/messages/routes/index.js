import Express from "express";
import Boom from "@hapi/boom";
import MessageController from "../controller";
const router = Express.Router();

export default function (io) {
  router.get("/all/:nickname", async (req, res, next) => {
    try {
      const { nickname } = req.params;
      const controller = new MessageController();
      const response = await controller.getMessages();
      res.send([
        {
          interlocutor: true,
          message: `Welcome ${nickname}`,
          date: new Date(),
        },
        ...response,
      ]);
    } catch (error) {
      next(Boom.conflict(error));
    }
  });

  router.post("/send", async (req, res, next) => {
    try {
      const message = req.body;
      const controller = new MessageController();
      const response = await controller.sendMessage(message);
      io.emit("message", response);
      res.sendStatus(200);
    } catch (error) {
      next(Boom.conflict(error));
    }
  });

  return router;
}
