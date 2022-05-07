const {
  connectedUser,
  disconnectedUser,
  getUsers,
  saveMessage,
} = require("../controllers/sockets");
const { verifyJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      const [isValid, uid] = verifyJWT(socket.handshake.query?.authorization);
      if (!isValid) return socket.disconnect();

      await connectedUser(uid);

      socket.join(uid);

      // Emit user online
      this.io.emit("user-list", await getUsers());

      // To listen message
      socket.on("message", async (payload) => {
        const message = await saveMessage(payload);
        this.io.to(payload.to).emit("message", message);
        this.io.to(payload.from).emit("message", message);
      });
      // Socket join
      // Disconnect user
      socket.on("disconnect", async () => {
        await disconnectedUser(uid);
        this.io.emit("user-list", await getUsers());
      });
    });
  }
}

module.exports = Sockets;
