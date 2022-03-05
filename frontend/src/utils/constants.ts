export const LANGS = {
  es: "es",
  en: "en",
};

export const STORED_TOKEN_KEY = "token";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const BASE_API = process.env.REACT_APP_API;
export const GIPHY_KEY = process.env.REACT_APP_GIPHY_KEY;

export const SOCKET_EVENTS = {
  CONNECTION: "connect",
  DISCONNECT: "disconnect",

  JOIN_TO_ROOM: "joinToRoom",

  RECEIVE_ROOM_MESSAGES: "receiveRoomMessages",
  SEND_ROOM_MESSAGE: "sendRoomMessage",
};
