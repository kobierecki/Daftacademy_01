const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js"
  },
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          isProduction
            ? MiniCssExtractPlugin.loader
            : { loader: "style-loader", options: { sourceMap: true } },
          { loader: "css-loader", options: { sourceMap: isProduction } },
          { loader: "postcss-loader", options: { sourceMap: isProduction } },
          { loader: "sass-loader", options: { sourceMap: isProduction } }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
