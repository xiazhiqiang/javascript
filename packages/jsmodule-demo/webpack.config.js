const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, args) => {
  const config = {
    mode: args.mode || "production",

    devtool: args.mode !== "production" ? "source-map" : "hidden-source-map",

    entry: {
      index: path.join(__dirname, "src/commonjs/index.cjs"),
      index2: path.join(__dirname, "src/es6/index.mjs"),
      index3: path.join(__dirname, "src/dynamicImport/index.mjs"),
    },

    output: {
      clean: true, // 清除目录后输出
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
      // library: {
      //   name: "jsmodule",
      //   type: "umd",
      // },
    },

    resolve: {
      extensions: [".js", ".mjs", ".cjs"],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public/index.html"),
      }),
    ],

    devServer: {
      open: false,
      static: [
        {
          directory: path.join(__dirname, "public"),
        },
      ],
      historyApiFallback: true,
      devMiddleware: {
        writeToDisk: true,
      },
      client: {
        overlay: true,
        progress: true,
      },
    },
  };

  return config;
};
