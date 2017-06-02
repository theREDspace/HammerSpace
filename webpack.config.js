var TypedocWebpackPlugin = require('typedoc-webpack-plugin');

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
