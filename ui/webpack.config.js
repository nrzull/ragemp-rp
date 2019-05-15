const { resolve } = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

const { NODE_ENV = "development" } = process.env;

const SRC = resolve(__dirname, "src");
const DIST = resolve(__dirname, "..", "mp", "client_packages", "ui");

const config = {
  mode: NODE_ENV,
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()]
  },
  entry: SRC,
  output: { path: DIST, publicPath: "package://ui/" },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: SRC,
        use: "ts-loader"
      }
    ]
  },
  plugins: [new HtmlPlugin({ template: resolve(SRC, "index.html") })]
};

module.exports = config;
