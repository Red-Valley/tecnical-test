const express = require("express");
const app = express();

const config = require("../config");
const { PORT } = config;

const router = require("./routes");

// database
const dbConnection = require("./loaders/database")();
dbConnection.on('error', (err) => console.error("unable to connect to database", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", router);

app.set("port", PORT);

module.exports = app;
