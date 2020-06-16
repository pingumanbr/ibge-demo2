//webpack.config.js
var path = require('path');
var webpack = require('webpack');
module.exports = {
 entry: __dirname + '/src/index.js',
 output: {
  path: path.join(__dirname, 'src'),
  filename: 'bundle.js'
 },
  devServer: {
    compress: true,
    disableHostCheck: true,   // That solved it
    publicPath: "/",
    contentBase: "src",
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
   test: /\.css$/,
   loader: "style-loader!css-loader"
  }]
 }
}
