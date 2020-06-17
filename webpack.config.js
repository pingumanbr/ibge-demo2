//webpack.config.js
var path = require('path');
var webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./index.html"
});
const copyWebpackPlugin = new CopyWebpackPlugin([{
    from: './public/favicon.ico',
    to: './favicon.ico'
}]);

var APP_DIR = path.resolve(__dirname, '/src');

module.exports = {
 entry: __dirname + '/src/index.js',
 output: {
  path: path.join(__dirname, '/public'),
  filename: 'index.js'
 },
  devServer: {
    compress: true,
    disableHostCheck: true, 
    publicPath: "/public/",
    contentBase: "/public",
    hot: true,
    port:8080
 },      
 module: {
  rules: [{
   test: /.js?$/,
   loader: 'babel-loader',
   exclude: /node_modules/,
   query: {
    presets: ['env', 'react']
   }
  },       
  {
    test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
    loader: "url-loader?limit=100000"
  },
 {
  test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
  exclude: /node_modules/,
  use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
},         
  {
   test: /\.css$/,
   loader: "style-loader!css-loader"
  }]
 }
}
