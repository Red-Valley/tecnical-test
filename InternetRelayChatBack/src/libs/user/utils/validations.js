import Boom from "@hapi/boom";
import UserDAO from "../DAO";
import { emailRegex, specialCharacters, containsNumber } from "./regex";

/**
 * @type {void}
 */
const DAO = new UserDAO();
/**
 *Validate if nickname is available for use
 * @param {string} nickname
 * @returns {Boolean}
 */
async function validateNickname(nickname) {
  const nickIsAvailable = await DAO.findNickname(nickname);
  if (nickIsAvailable) throw Boom.conflict("Nickname already exists");
  return true;
}
/**
 * Static validation for email
 * @param {string} email
 * @returns {Boolean}
 */
function validateEmail(email) {
  return emailRegex.test(String(email).toLowerCase());
}
/**
 * Validate all options for a secure password
 * @param {String} password
 * @param {String} rePassword
 * @returns {Boolean}
 */
function validatePassword(password, rePassword) {
  if (password === rePassword) {
    if (specialCharacters.test(String(password))) {
      if (containsNumber.test(String(password))) {
        return true;
      }
      throw Boom.conflict("The password must contain at least one number");
    }
    throw Boom.conflict(
      "The password must contain at least one special character"
    );
  }
  throw Boom.conflict("Passwords are not the same");
}
/**
 * Validate for empty strings
 * @param {String} str
 * @returns {Boolean}
 */
function isEmpty(str) {
  return !str || str.length === 0;
}

export { validateNickname, validateEmail, validatePassword, isEmpty };
