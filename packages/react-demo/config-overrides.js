module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.externals = {
    react: "React",
    "react-dom": "ReactDOM",
  };

  return config;
};
