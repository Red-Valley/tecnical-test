import { chatRoomActionTypes } from "actions/chatRoomActions";

const initialState: ChatRoomState = {
  pending: false,
  page: 0,
  error: false,
};

const chatRoomReducer = (state = initialState, action: IMessagesAction) => {
  const messages = state?.messages || [];
  switch (action.type) {
    case chatRoomActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.payload?.page,
      };

    case chatRoomActionTypes.LIST_MESSAGES_REQUEST:
      return {
        ...state,
        error: false,
        pending: true,
      };
    case chatRoomActionTypes.LIST_MESSAGES_SUCCESS:
      const page = (action.payload && typeof state?.page === "number") ? state?.page + 1 : state.page;
      return {
        ...state,
        error: false,
        page,
        messages: [...messages, ...(action.payload as IMessage[])],
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

    case chatRoomActionTypes.CONNECT_TO_ROOM:
    default:
      return { ...state };
  }
};

export default chatRoomReducer;
