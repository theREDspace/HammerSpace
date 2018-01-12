var path = require("path");
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var bundle = 'dist/hammerspace';
var bundleMin = 'dist/hammerspace.min';

var dependancyPath = './node_modules/';
var testEnvironmentPath = dependancyPath + 'hammerspace-test/test.js';

module.exports = {
  entry: {
    [bundle]: './src/main.ts',
    [bundleMin]: './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].js',
    library: 'Hammer',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [{
      test: /.ts$/,
      enforce: 'pre',
      loader: "tslint-loader",
      options: {
        configFile: 'tslint.json',
        typeCheck: true
      }
    },{
      test: /.ts$/,
      loader: 'awesome-typescript-loader'
    }]
  },
  plugins: [
    new TypedocWebpackPlugin({
      hideGenerator: true,
      'exclude': '{**/*.spec.ts,**/main.ts}'
    }, './src'),
    new UglifyJSPlugin({include: [ bundleMin ]}),
    new HtmlWebpackPlugin({
      title: 'HammerSpace Test',
      filename: './test/index.html',
      template: './src/test/test.html',
      inject: false
    })
  ]
},{
  entry: './src/test/test.js',
  output: {
    path: path.resolve(__dirname, './'),
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HammerSpace Test',
      filename: './test/index.html',
      template: './src/test/test.html',
      inject: false
    })
  ]
};
