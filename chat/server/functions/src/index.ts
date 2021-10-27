import * as dotenv from "dotenv";

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

import express from "express";

import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import { applyMiddleware, applyRoutes } from "./utils";
import { firebaseConfig, Enviroments, Emulators } from "./utils/constants";
import routes from "./services";

dotenv.config();

export class Api {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.apply();
  }

  private apply(): void {
    applyMiddleware(middleware, this.express);
    applyRoutes(routes, this.express);
    applyMiddleware(errorHandlers, this.express);
  }
}

process.on("uncaughtException", (e) => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", (e) => {
  console.log(e);
  process.exit(1);
});

if (process.env.NODE_ENV !== Enviroments.Producction) {
  admin.initializeApp(firebaseConfig);
  initializeApp(firebaseConfig);
  connectAuthEmulator(getAuth(), Emulators.AuthEndPoint);
} else {
  admin.initializeApp();
}

exports.api = functions.https.onRequest(new Api().express);
