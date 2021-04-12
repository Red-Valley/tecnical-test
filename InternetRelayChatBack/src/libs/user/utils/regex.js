/**
 * Regex for email validation
 * @type {String}
 */
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/**
 * Regex for special characters
 * @type {String}
 */
// eslint-disable-next-line no-useless-escape
const specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
/**
 * Validate if string contains number
 * @type {String}
 */
const containsNumber = /\d/;

/**
 * Validate if can be parsed to integer
 * @param {String} value
 * @returns {Boolean} Can be parsed to integer
 */
const isInteger = (value) => /^\d+$/.test(value);

export { emailRegex, specialCharacters, containsNumber, isInteger };
