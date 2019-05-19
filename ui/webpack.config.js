const { resolve } = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const ModuleDependencyWarning = require("webpack/lib/ModuleDependencyWarning");

const { NODE_ENV = "development", TARGET = "game" } = process.env;
const IS_WEB = TARGET === "web";

const ROOT = resolve(__dirname, "src");

const SRC = IS_WEB ? resolve(ROOT, "web") : ROOT;

const DIST = IS_WEB
  ? resolve(__dirname, "dist")
  : resolve(__dirname, "..", "mp", "client_packages", "ui");

const PUBLIC_PATH = IS_WEB ? "/" : "package://ui/";
const STATS = { modules: false, children: false };

// TODO move it to appropriate place
class IgnoreNotFoundExportPlugin {
  apply(compiler) {
    const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/;
    function doneHook(stats) {
      stats.compilation.warnings = stats.compilation.warnings.filter(function(
        warn
      ) {
        if (
          warn instanceof ModuleDependencyWarning &&
          messageRegExp.test(warn.message)
        ) {
          return false;
        }
        return true;
      });
    }
    if (compiler.hooks) {
      compiler.hooks.done.tap("IgnoreNotFoundExportPlugin", doneHook);
    } else {
      compiler.plugin("done", doneHook);
    }
  }
}

const config = {
  mode: NODE_ENV,
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()]
  },
  entry: SRC,
  output: {
    path: DIST,
    publicPath: PUBLIC_PATH
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: ROOT,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
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
    new HtmlPlugin({ template: resolve(ROOT, "index.html") }),
    new ForkTsCheckerPlugin(),
    new IgnoreNotFoundExportPlugin()
  ],
  stats: STATS,
  devServer: { stats: STATS, historyApiFallback: true }
};

module.exports = config;
