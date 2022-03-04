const { PORT } = require("../config");
const express = require("express");
const app = express();
const cors = require("cors");

const originWhiteList =
  process.env.NODE_ENV === "production"
    ? [
        /* put here production whitelisted domains */
      ]
    : [`http://localhost:3000`];

const corsOptions = {
  origin: originWhiteList,
};

const server = require("http").createServer(app);
// websocket
require("./loaders/socket")(server);
// database
require("./loaders/database")();

const router = require("./routes");

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", router);

app.set("port", PORT);

module.exports = { app, server };
