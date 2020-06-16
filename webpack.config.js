//webpack.config.js
var path = require('path');
var webpack = require('webpack');
module.exports = {
 entry: __dirname + 'index.js',
 output: {
  path: path.join(__dirname, 'src'),
  filename: 'bundle.js'
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
   test: /\.css$/,
   loader: "style-loader!css-loader"
  }]
 }
}
