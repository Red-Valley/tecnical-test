import * as types from '../constants/ActionTypes';
let nextMessageId = 0;
let nextUserId = 0;

//Agrega un nuevo mensaje
export const addMessage = (message,author)=>({
    type: types.ADD_MESSAGE,
    id:nextMessageId++,
    message,
    author
});

//Agrega un nuevo usuario al chat
export const addUser = name=>({
    type: types.ADD_USER,
    id: nextUserId++,
    name
});

//recibe mensajes
export const messageReceived = (id,message,author,create_at)=>({
    type: types.MESSAGE_RECEIVED,
    id: nextMessageId++,
    message,
    author,
    create_at
});

//Actualiza listado de usuarios conectados
export const populateUsersList =  users =>({
    type: types.USER_LIST,
    users
})