const { PORT } = require("../config");
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");

const originWhiteList =
  process.env.NODE_ENV === "production"
    ? [
        /* put here production whitelisted domains */
      ]
    : '*'

const corsOptions = {
  origin: originWhiteList,
};

const server = require("http").createServer(app);
// websocket
require("./loaders/socket")(server, { cors: corsOptions });
// database
require("./loaders/database")();

const router = require("./routes");

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", router);

// client
app.use(express.static(path.join(__dirname, '../dist',)))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/build/', 'index.html'))
});

app.set("port", PORT);

module.exports = { app, server };
