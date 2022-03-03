const { PORT } = require("../config");
const express = require("express");
const app = express();

const server = require('http').createServer(app);
// websocket
require('./loaders/socket')(server);
// database
require("./loaders/database")();

const router = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", router);

app.set("port", PORT);

module.exports = { app, server};
