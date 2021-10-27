import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Request, Response } from "express";

import { Route } from "../../utils/types";
import { Collections } from "../../utils/constants";
import { SignUpUserModel } from "../../models/user/signUpUser";
import { UserRepository } from "../../respositories/userRepository";

import { FBAuth } from "../../utils/auth/fbAuth";

const signup: Route = {
  path: `/${Collections.Users}/signup`,
  method: "post",
  handler: async (req: Request, res: Response, next) => {
    const model = new SignUpUserModel(req.body);
    await new UserRepository()
      .signup(model)
      .then((r) => res.status(200).json(r))
      .catch((err) => next(err));
  },
};

const login: Route = {
  path: `/${Collections.Users}/login`,
  method: "post",
  handler: async (req: Request, res: Response, next) => {
    const model = new SignUpUserModel(req.body);
    signInWithEmailAndPassword(getAuth(), model.email, model.password)
      .then((data) => {
        return data.user.getIdToken();
      })
      .then((token) => {
        return res.status(200).json(token);
      })
      .catch((err) => next(err));
  },
};

const get: Route = {
  path: `/${Collections.Users}`,
  method: "get",
  handler: [
    FBAuth,
    async (req: Request, res: Response, next) => {
      await new UserRepository()
        .getByUserId(req.user.uid)
        .then((r) => res.status(200).json(r))
        .catch((err) => next(err));
    },
  ],
};

export default [signup, login, get];
