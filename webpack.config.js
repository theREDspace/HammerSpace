var path = require("path");
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var bundle = 'dist/hammerspace';
var bundleMin = 'dist/hammerspace.min'

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
    new UglifyJSPlugin({include: [ bundleMin ]})
  ]
};
