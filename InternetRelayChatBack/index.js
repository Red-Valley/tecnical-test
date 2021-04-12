/* eslint-disable no-undef */
require("@babel/register")({
  extensions: [".js"],
});

require("@babel/core").transform("code", {
  presets: ["@babel/preset-env"],
});

require("./src/app");
