import db from "../../../db/models";
/**
 * playerInformation
 * @typedef {Object} PlayerInformation
 * @property {String} fullName
 * @property {String | number} nickname
 * @property {String} email
 * @property {String | number} password
 * @property {String | number} rePassword
 */
export default class UserDAO {
  /**
   * Static search for nickname at database
   * @param {String} nickname
   * @returns {Object}
   */
  findNickname(nickname) {
    const { user } = db;
    return user.findOne({ where: { nickname } });
  }
  /**
   * Static creation at database of user
   * @param {PlayerInformation} userInformation
   * @returns {Object}
   */
  createUser(userInformation) {
    const { user } = db;
    return user.create(userInformation);
  }
  /**
   * Function for find the user in database
   * @param {String} email
   * @returns {Object} user information
   */
  findUserByEmail(email) {
    const { user } = db;
    return user.findOne({ where: { email } });
  }
  /**
   * Refresh the current session token for a better session control
   * @param {String} refreshTokenNew
   * @returns {Object} new token for session
   */
  pushRefreshToken(refreshTokenNew) {
    const { refreshToken } = db;
    return refreshToken.create({ refreshToken: refreshTokenNew });
  }
  /**
   * Deletes the token for a logout process
   * @param {String} refreshTokens
   * @returns {Object} Deleted token
   */
  removeToken(refreshTokens) {
    const { refreshToken } = db;
    return refreshToken.destroy({ where: { refreshToken: refreshTokens } });
  }
}
