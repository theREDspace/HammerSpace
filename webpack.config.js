var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  output: {
    filename: './dist/bundle.js'
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
      'exclude': '**/*.spec.ts'
    }, './src')
  ]
};

if (process.env.NODE_ENV === 'prod') {
  module.exports.output.filename = './dist/bundle.min.js'
  module.exports.plugins.push(new UglifyJSPlugin());
}