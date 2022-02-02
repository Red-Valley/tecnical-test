const express =require ('express');
const server = express();   

//IMPORTACION DE RUTAS
const auth = require('./auth.route')
const user = require('./users.route')
const conversation = require('./conversation.route')
const message = require('./message.route')
//USO DE RUTAS
server.use("/auth", auth)
server.use("/users", user)
server.use("/conversation", conversation)
server.use("/message", message)

module.exports = server