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
    loaders: [
      { test: /.ts$/, loader: 'awesome-typescript-loader' }
    ]
  },
  plugins: [
      new TypedocWebpackPlugin({})
  ]
};
