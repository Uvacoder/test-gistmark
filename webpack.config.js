const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const TerserPlugin = require("terser-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

// Helpers
const dev = process.env.NODE_ENV === "development"

// Variables
const devFolderPath = path.resolve(__dirname, "__dev__")
const prodFolderPath = path.resolve(__dirname, "dist")

module.exports = {
  mode: dev ? "development" : "production",
  devtool: dev ? "eval-source-map" : false,
  // devtool: dev ? "eval-source-map" : false,
  entry: path.resolve(__dirname, "src", "index.tsx"),
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".html", ".css"],
  },
  output: {
    path: dev ? devFolderPath : prodFolderPath,
    filename: "[name].[contenthash].bundle.js",
    publicPath: "/",
  },
  devServer: {
    contentBase: devFolderPath,
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
  optimization: {
    minimize: true,
    nodeEnv: "production",
    concatenateModules: true,
    runtimeChunk: "single",
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: "all",
        terserOptions: {
          warnings: true,
          compress: {
            drop_console: dev ? false : true,
            drop_debugger: dev ? false : true,
          },
          parse: {},
          mangle: true,
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 10,
      minSize: 0,
    },
  },
  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [dev && "react-refresh/babel"].filter(Boolean),
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /.(css)/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
        options: {
          limit: 100000,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: path.resolve(__dirname, "public", "favicon.ico"),
      scriptLoading: "defer",
    }),
    new Dotenv({
      path: path.resolve(__dirname, ".env"),
      safe: true,
      systemvars: true,
      silent: true,
    }),
    dev && new ReactRefreshWebpackPlugin(),
    new CleanWebpackPlugin(),
  ].filter(Boolean),
}
