import * as admin from "firebase-admin";

import { Request, Response, NextFunction } from "express";

import { HTTP400Error } from "../../utils/httpClientError/httpError/400Error";
import { UserRepository } from "../../respositories/userRepository";

export const FBAuth = (req: Request, res: Response, next: NextFunction) => {
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split("Bearer ")[1];
  } else {
    throw new HTTP400Error("No token found");
  }
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      return new UserRepository().storeContext
        .where("userId", "==", decodedToken.uid)
        .limit(1)
        .get();
    })
    .then(() => {
      next();
    })
    .catch((err) => next(err));
};
