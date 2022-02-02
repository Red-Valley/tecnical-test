const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const routes = require('./src/routes/index')


require('./db.js')




const server = express()


server.use(express.urlencoded({ extended: false, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use("/images", express.static(path.join(__dirname, "public/images")))
server.use(cors())
server.use(express.json())
server.use(helmet())
server.use(morgan("dev"))


server.use('/', routes);
server.set('port', process.env.PORT || 3001);

//SOCKET
const http = require("http");
const ServerHTTP = http.createServer(server);
const { Server } = require("socket.io");

const io = new Server(ServerHTTP, {
    cors: {
      origin: process.env.FRONT_DOMAIN,
    },
  });

  let users = []

const addUsers = (userId, socketId)=>{
    !users.some((user)=>user?.userId===userId) && users.push({userId, socketId})
} 

const removeUser = (socketId) =>{
    users = users.filter(user => user.socketId!==socketId)                                                                                                                                                                                                                                                                                                            
}

const getUser = (userId) =>{
   return users.find(user=>user.userId === userId)
}

io.on("connection", (socket)=>{
    console.log("a user conected.")
    socket.on("addUser", (userId)=>{
        addUsers(userId, socket.id)
        io.emit("getUsers", users)
    })


    socket.on("sendMessage", ({senderId, receiverId, text})=>{
        const user = getUser(receiverId)
        console.log('un mensajito', user.socketId)
        io.to(user.socketId).emit("getMessage", {
            senderId,
            receiverId,
            text
        })
    })

    socket.on('disconnect', ()=>{
        console.log('a user disconnected!')
        removeUser(socket.id)
    })
})

ServerHTTP.listen(server.get('port'), () => console.log(`I'm in http://localhost:${server.get('port')}`));

