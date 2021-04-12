import Boom from "@hapi/boom";
import UserDAO from "../DAO";
import UserAuth from "../../../config/useAuth";
import {
  validateNickname,
  validateEmail,
  validatePassword,
  isEmpty,
} from "../utils/validations";
/**
 * playerInformation
 * @typedef {Object} PlayerInformation
 * @property {String} fullName
 * @property {String | number} nickname
 * @property {String} email
 * @property {String | number} password
 * @property {String | number} rePassword
 */
export default class UserController {
  constructor() {
    this.dao = new UserDAO();
    this.validateNickname = validateNickname;
    this.validateEmail = validateEmail;
    this.validatePassword = validatePassword;
    this.isEmpty = isEmpty;
  }

  /**
   * Sign up for the users that want to chat
   * @param {PlayerInformation} userInformation
   * @returns
   */
  async signUp(userInformation) {
    try {
      const {
        fullName,
        nickname,
        email,
        password,
        rePassword,
      } = userInformation;
      await this.validateNickname(nickname);
      this.validateEmail(email);
      this.validatePassword(password, rePassword);
      isEmpty(fullName);
      const user = await this.dao.createUser(userInformation);
      return user;
    } catch (error) {
      throw Boom.conflict(error);
    }
  }

  async signIn(email, password) {
    try {
      const authController = new UserAuth(email, password, this.dao);
      const login = await authController.auth();
      return login;
    } catch (error) {
      throw Boom.conflict(error);
    }
  }

  async logout(token) {
    await this.dao.removeToken(token);
  }
}
