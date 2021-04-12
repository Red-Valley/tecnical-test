import Express from "express";
import Boom from "@hapi/boom";
import UserController from "../controller";
const router = Express.Router();

router.post("/sign-up", async (req, res, next) => {
  try {
    const userInformation = req.body;
    const controller = new UserController();
    const userStatus = await controller.signUp(userInformation);
    res.json(userStatus);
  } catch (error) {
    next(Boom.conflict(error));
  }
});

router.post("/sign-in", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const controller = new UserController();
    const userLogin = await controller.signIn(email, password);
    res.json(userLogin);
  } catch (error) {
    next(Boom.conflict(error));
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    const { token } = req.body;
    const controller = new UserController();
    await controller.logout(token);
    res.json("Logout successful");
  } catch (error) {
    next(Boom.conflict(error));
  }
});

export default router;
