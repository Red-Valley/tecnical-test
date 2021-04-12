export const DEFAULT_MESSAGE = {
  nickname: "",
  message: "",
  date: "",
};
export const ON_WRITE_MESSAGE = "ON_WRITE_MESSAGE";
export const CLEAN_MESSAGE = "CLEAN_MESSAGE";

export const setWroteMessage = (payload) => ({
  type: ON_WRITE_MESSAGE,
  payload,
});

export const cleanMessage = () => ({
  type: CLEAN_MESSAGE,
});
