const Message = require('./controllers/message.controller');
module.exports = (ioConnection) => {
    let users = {};
    ioConnection.on('connection', async (socket) => {
        const menssageList = await Message.getAll();
        let messagesPayload = [];
        menssageList.map((message) => {
            messagesPayload.push({ id: message.id, author: message.author, message: message.message, create_at: message.create_at });
        });
        //carga historial de mensajes
        if (menssageList.length > 0) {
            socket.emit('MESSAGE_RECEIVED', messagesPayload);
        }
        //conexion de usuario
        socket.on('ADD_USER', (data) => {
            let nickValidation = Object.keys(users).filter(nickname => nickname == data);
            socket.nickname = data;
            users[socket.nickname] = socket;
            updateNicknames();

        });
        //envio de nuevo mensaje
        socket.on('ADD_MESSAGE', async (data) => {
            try {
                const newMessage = await Message.create(data.author, data.message);
                ioConnection.emit('ADD_MESSAGE', {
                    id: newMessage.id,
                    author: data.author,
                    message: data.message,
                    create_at: newMessage.create_at
                });
                return true;
            } catch (error) {
                return false;
            }
        })
        //desconexion  de usuario
        socket.on('disconnect', () => {
            if (!socket.nickname) return;
            delete users[socket.nickname];
            updateNicknames();

        });
        //funcion encargada de actualizar el listado de usuarios conectados
        const updateNicknames = () => {
            ioConnection.sockets.emit('USER_LIST', Object.keys(users));
        }
    });

}