const { SOCKET_EVENTS } = require("../utils/constants");
const { sendMessageService } = require("../services/messages/messagesService");

module.exports = (server, options = {}) => {
  const { Server } = require("socket.io");
  const io = new Server(server, options);

  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    let previousRoom;
    const changeRoom = (currentRoom) => {
      socket.leave(previousRoom);
      socket.join(currentRoom);
      previousRoom = currentRoom;
    };

    socket.on(SOCKET_EVENTS.JOIN_TO_ROOM, async (room_id = 'default') => {
      changeRoom(room_id);
    });

    socket.on(
      SOCKET_EVENTS.SEND_ROOM_MESSAGE,
      async ({ room_id = 'default', user_id, content, command }) => {
        const payload = { user_id, content, command };
        const { error, result } = await sendMessageService(payload);
        !error &&
          io.to(room_id).emit(SOCKET_EVENTS.RECEIVE_ROOM_MESSAGES, {
            ...result,
            createdAt: result.createdAt,
          });
      }
    );

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {

    });
  });
};
