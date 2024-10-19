const path = require("path");

module.exports = {
  mode: "production",
  entry: "./lib/shareScripts/popupScript.jsx",
  output: {
    path: path.resolve(__dirname, "public/shareScripts/popupScript"),
    filename: "script.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
