import _ from "lodash";
import Boom from "@hapi/boom";
import MessagesDAO from "../DAO";
import { API_KEY } from "../../../config";

export default class Messages {
  constructor() {
    this.dao = new MessagesDAO();
  }

  async sendMessage(messageObject) {
    try {
      if (messageObject.message.includes("/youtube_or_giphy")) {
        const arrWithCaller = messageObject.message.split(" ");
        arrWithCaller.shift();
        const message = arrWithCaller.join("&");
        const resObject = {
          ...messageObject,
          message: `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=1&q=${message}`,
          isImage: true,
        };
        await this.dao.setMessage(resObject);
        return resObject;
      }
      await this.dao.setMessage(messageObject);
      return messageObject;
    } catch (error) {
      throw Boom.conflict(error);
    }
  }

  async getMessages() {
    try {
      const response = await this.dao.getAll();
      return _.sortBy(response, (props) => props.dataValues.createAt);
    } catch (error) {
      throw Boom.conflict(error);
    }
  }
}
