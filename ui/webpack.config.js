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
      },

      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 2 } },
          "postcss-loader",
          "sass-loader"
        ]
      },

      {
        test: /\.(ttf|woff|png|jpe?g|gif)$/,
        use: "file-loader"
      },

      {
        test: /\.svg$/,
        use: "react-svg-loader"
      }
    ]
  },
  plugins: [
    new HtmlPlugin({ template: resolve(SRC, "index.html") }),
    new MiniCssExtractPlugin()
  ],
  stats: { modules: false, children: false }
};

module.exports = config;
