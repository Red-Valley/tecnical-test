import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import http from "http";
import IO from "socket.io";
import cookie from "cookie";
import { accessTokenSecret } from "./config";
import { errorHandler } from "../src/utils/error/handler";
import notFoundHandler from "../src/utils/error/notFoundHandler";

import user from "./libs/user/routes";
import messages from "./libs/messages/routes";

// eslint-disable-next-line no-undef
require("jsonwebtoken");

const app = express();
// eslint-disable-next-line no-undef
app.set("PORT", process.env.PORT || 3002);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = IO(server);

io.use((socket, next) => {
  const handshakeData = socket.request;
  const cookies = cookie.parse(handshakeData.headers.cookie);
  const { accessToken } = cookies;
  jwt.verify(accessToken, accessTokenSecret, (err) => {
    if (err) {
      return next("Unauthorized");
    }
    next();
  });
});

app.use("/api/user", user);
app.use("/api/messages", messages(io));

app.use(notFoundHandler);
app.use(errorHandler);

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "test") {
  server.listen(app.get("PORT"), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Project is running at port ", app.get("PORT"));
    }
  });
}

// eslint-disable-next-line no-undef
module.exports = app;
