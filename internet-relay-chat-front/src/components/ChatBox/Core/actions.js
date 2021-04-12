export const SET_MESSAGE_INTO_CHAT = "SET_MESSAGE_INTO_CHAT";
export const SET_MESSAGE_HISTORY = "SET_MESSAGE_HISTORY";

export const setMessageIntoChat = (payload) => ({
  type: SET_MESSAGE_INTO_CHAT,
  payload,
});

export const setMessageHistory = (payload) => ({
  type: SET_MESSAGE_HISTORY,
  payload,
});
