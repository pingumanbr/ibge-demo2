//webpack.config.js
var path = require('path');
var webpack = require('webpack');
module.exports = {
 entry: __dirname + '/src/index.js',
 output: {
  path: path.join(__dirname, 'public'),
  filename: 'index.js'
 },
  devServer: {
    compress: true,
    disableHostCheck: true, 
    publicPath: "/",
    contentBase: "./public",
    hot: true,
    port:8080
 },      
 module: {
  rules: [{
   test: /.jsx?$/,
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
