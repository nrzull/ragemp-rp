const { resolve } = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const ModuleDependencyWarning = require("webpack/lib/ModuleDependencyWarning");

const { NODE_ENV = "development" } = process.env;

const SRC = resolve(__dirname, "src");
const DIST = resolve(__dirname, "..", "mp", "client_packages", "ui");

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
    publicPath: "package://ui/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: SRC,
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
    new HtmlPlugin({ template: resolve(SRC, "index.html") }),
    new ForkTsCheckerPlugin(),
    new IgnoreNotFoundExportPlugin()
  ],
  stats: {
    modules: false,
    children: false
  }
};

module.exports = config;
