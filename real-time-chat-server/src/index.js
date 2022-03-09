//dependecias
const http = require('http');
const path = require('path');
const express = require('express');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const mySockets = require('./sockets');
const { send } = require('process');
const myRouter = require('./routes/index.js');
var cors = require('cors');

//configuracion de servidor|cors|sockets
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1/', myRouter);
app.set('port',process.env.PORT || 3900);


const httpServer = http.createServer(app);
const ioConnection = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});
mySockets(ioConnection);

//const urlMongo = process.env.MONGODB_URI;
const urlMongo = 'mongodb://127.0.0.1:27017/chat-database';//modificar
mongoose.connect(urlMongo, { useNewUrlParser: true }).then(db => {
    console.log('db is conected');
}).catch(err => {
    console.log(err);
});

//Servidor Node
httpServer.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`);
})