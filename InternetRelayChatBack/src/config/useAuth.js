import Boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import { accessTokenSecret, refreshAccessTokenSecret } from ".";

export default class UserAuth {
  /**
   * Input of data for auth
   * @param {String} email user's email
   * @param {String} password user's password
   * @param {void} userDao DAO of user for use data
   */
  constructor(email, password, userDao) {
    this.email = email;
    this.password = password;
    this.userDao = userDao;
  }

  /**
   * Validate login for auth
   * @returns {Object}
   */
  async loginUser(email, password) {
    const userFound = await this.userDao.findUserByEmail(email);
    if (userFound) {
      if (password === userFound.dataValues.password) {
        return userFound;
      }
      throw Boom.conflict("Error email or password invalid");
    }
    throw Boom.conflict("Error email or password invalid");
  }

  /**
   * Validate login for auth
   * @returns {Object}
   */
  async auth() {
    const user = await this.loginUser(this.email, this.password);
    const accessToken = jwt.sign(
      {
        id: user.id,
        nickname: user.nickname,
      },
      accessTokenSecret
    );
    const refreshToken = jwt.sign(
      {
        id: user.id,
        nickname: user.nickname,
      },
      refreshAccessTokenSecret
    );
    await this.userDao.pushRefreshToken(refreshToken);
    return {
      userId: user.id,
      nickname: user.nickname,
      accessToken,
      refreshToken,
    };
  }
}
