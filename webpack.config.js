//1) publicPath explanation: https://stackoverflow.com/questions/37962559/using-webpack-with-react-router-bundle-js-not-found
//2) How to use react router with webpack, cannot GET route: https://www.robinwieruch.de/webpack-react-router/

const path = require("path");
const { SourceMapDevToolPlugin, ProvidePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
module.exports = {
  entry: { app: "./src/index.tsx" },
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/", //Alternative option if using HTML Webpack plugin
  },
  devServer: {
    historyApiFallback: true, //to enable react-router with webpack!
    port: 3000,
  },
  devtool: "source-map", //required to load [file].map
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].[ext]"], // ?name=[name].[ext] is only necessary to preserve the original file name
      },
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    fallback: {
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      url: require.resolve("url/"),
      buffer: require.resolve("buffer/"),
      util: require.resolve("util/"),
    },
  },
  target: "web",
  node: {
    __dirname: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      chunks: ["app"],
    }),
    new ProvidePlugin({
      process: "process/browser",
    }),
    new ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new Dotenv({
      // path: './src/config/config', // load this now instead of the ones in '.env'
      path: "./src/.env.local", // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: false, // load '.env.defaults' as the default values if empty.
    }),
    //used in conjuction with devtool
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
};
