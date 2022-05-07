const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockets");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Db connection
    dbConnection();

    // Http server
    this.server = http.createServer(this.app);

    // Sockets
    this.io = socketIo(this.server, {});
  }

  middlewares() {
    // Public directory
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // Cors
    this.app.use(cors());

    // Body parse
    this.app.use(express.json());

    // Endpoints
    this.app.use("/api/login", require("../router/auth"));
    this.app.use("/api/messages", require("../router/messages"));
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    this.configSockets();

    this.server.listen(this.port, () => {});
  }
}

module.exports = Server;
