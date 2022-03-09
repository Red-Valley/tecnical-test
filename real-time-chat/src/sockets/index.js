import runtimeEnv from '@mars/heroku-js-runtime-env';
import io from 'socket.io-client';
import * as types from '../constants/ActionTypes';
import { addUser, messageReceived, populateUsersList } from '../actions';



const setupSockets = (dispatch, username) => {
    const env = runtimeEnv();
    const urlServer = env.REACT_APP_URL_SERVER;
    const socket = io(urlServer);

    socket.emit(types.ADD_USER, username);

    socket.on(types.MESSAGE_RECEIVED, (data) => {
        data.map((message) => {
            dispatch(messageReceived(message.id, message.message, message.author, message.create_at));
        })
    })

    socket.on(types.ADD_MESSAGE, (data) => {
        dispatch(messageReceived(data.id, data.message, data.author, data.create_at));
    });

    socket.on(types.USER_LIST, (users) => {
        dispatch(populateUsersList(users));
    });
    return socket;
}

export default setupSockets;