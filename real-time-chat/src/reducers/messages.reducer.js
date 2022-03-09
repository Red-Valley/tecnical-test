import * as types from '../constants/ActionTypes';
const messages = (state = [], action) => {
    switch (action.type) {
        case types.ADD_MESSAGE:
        case types.MESSAGE_RECEIVED:
            return state.concat([{
                id: action.id,
                author: action.author,
                message: action.message,
                create_at:action.create_at
            }])
        default:
            return state
    }
}

export default messages;