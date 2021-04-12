import db from "../../../db/models";

export default class MessagesDAO {
  getAll() {
    const { chatHistory } = db;
    return chatHistory.findAll();
  }

  setMessage(message) {
    const { chatHistory } = db;
    return chatHistory.create(message);
  }
}
