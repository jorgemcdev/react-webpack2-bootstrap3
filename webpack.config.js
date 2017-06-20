const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const bootstrapEntryPoints = require('./webpack.bootstrap.config');

const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production' // true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader']
const cssProd = ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: ['css-loader', 'sass-loader'],
  publicPath: "/dist"
});
const cssConfig = isProd ? cssProd : cssDev;

const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
  entry: {
    app: './src/app.js',
    bootstrap: bootstrapConfig
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(jpg|png|gif|svg)/,
        use: [
          // 'file-loader?name=/images/[name].[ext]',
          'file-loader?name=[name].[ext]&publicPath=./&outputPath=images/',
          'image-webpack-loader'
        ]
      },
      {
        test: /\.(woff2?|svg)$/,
        use: 'url-loader?limit=10000&name=fonts/[name].[ext]'
      },
      {
        test: /\.(ttf|eot)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        use: 'imports-loader?jQuery=jquery'
      }
    ]
  },
  devServer: {
    hot: !isProd,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3030,
    stats: 'errors-only',
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Project',
      minify: {
        collapseWhitespace: false,
      },
      hash: true,
      template: './src/index.html' // Load a custom template
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: !isProd,
      allChunks: true
     }),
    new webpack.HotModuleReplacementPlugin(),  // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
      purifyOptions: { info: true, minify: true }
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    })
  ]
}
