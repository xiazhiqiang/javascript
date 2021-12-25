const path = require("path");

module.exports = function override(config, env) {
  // 参数中的 config 就是默认的 webpack config

  config.mode =
    ["prod", "production"].indexOf(env) !== -1 ? "production" : "development";

  config.resolve.alias = {
    "@": path.join(__dirname, "../src"),
  };

  // 一定要把新的 config 返回
  return config;
};
