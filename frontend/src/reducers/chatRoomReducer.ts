import { chatRoomActionTypes } from "actions/chatRoomActions";

const initialState: ChatRoomState = {
  pending: false,
  error: false,
};

const chatRoomReducer = (state = initialState, action: IMessagesAction) => {
  const messages = state?.messages || [];
  switch (action.type) {
    case chatRoomActionTypes.LIST_MESSAGES_REQUEST:
      return {
        ...state,
        error: false,
        pending: true,
      };
    case chatRoomActionTypes.LIST_MESSAGES_SUCCESS:
      return {
        ...state,
        error: false,
        messages: [...(action.payload as IMessage[]), ...messages],
        pending: false,
      };
    case chatRoomActionTypes.LIST_MESSAGES_FAILURE:
      return {
        ...state,
        error: true,
        messages: [],
        pending: false,
      };

    case chatRoomActionTypes.RECEIVE_MESSAGE:
      return {
        ...state,
        error: false,
        messages: [action.payload, ...messages],
        pending: false,
      };

    default:
      return { ...state };
  }
};

export default chatRoomReducer;
