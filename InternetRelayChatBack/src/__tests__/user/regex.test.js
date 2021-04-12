/* eslint-disable no-undef */
import {
  emailRegex,
  containsNumber,
  specialCharacters,
} from "../../libs/user/utils/regex";

describe("REGEX FUNCTIONS FOR CHECKS AT CODE OR INNER DATA", () => {
  it("'emailRegext' should check if a string is an email", () => {
    expect(emailRegex.test("jose.hernandezhoyos@gmail.com")).toEqual(true);
    expect(emailRegex.test("jose.hernandezhoyos@gmail")).toEqual(false);
    expect(emailRegex.test("jose.hernandezhoyosgmail.com")).toEqual(false);
  });
  it("'containsNumber' should chek if a string contains numbers", () => {
    expect(containsNumber.test("A1B2C3")).toEqual(true);
    expect(containsNumber.test("A12223")).toEqual(true);
    expect(containsNumber.test("123")).toEqual(true);
    expect(containsNumber.test("ABC")).toEqual(false);
  });
  it("'specialCharacters' should check if a password have at least a special character", () => {
    expect(specialCharacters.test("123456*")).toEqual(true);
    expect(specialCharacters.test("$$test$$")).toEqual(true);
    expect(specialCharacters.test("t3s7#")).toEqual(true);
    expect(specialCharacters.test("genericPassword123")).toEqual(false);
  });
});
