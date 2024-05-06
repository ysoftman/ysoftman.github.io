const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //target: 'node',
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    clean: true,
  },
  devServer: {
    open: true,
    port: 8080,
    host: "localhost",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["page1"],
    }),
    new HtmlWebpackPlugin({
      filename: "navbar.html",
      template: "./src/navbar.html",
      chunks: ["page2"],
    }),
    new HtmlWebpackPlugin({
      filename: "programs.html",
      template: "./src/programs.html",
      chunks: ["page3"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        // webpack5 부터 asset/resource 타입이면 file-loader 없이 자동 번들된다.
        type: "asset/resource",
        generator: {
          filename: "./images/[name][ext]",
        },
      },
      {
        test: /\.(eot|svg|ttf|otf|woff|woff2)$/i,
        // webpack5 부터 asset/resource 타입이면 file-loader 없이 자동 번들된다.
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.md$/i,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
    ],
  },
  watchOptions: {
    poll: 1000,
  },
};
