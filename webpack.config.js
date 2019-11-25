const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

const bundle = 'dist/hammerspace';
const bundleMin = 'dist/hammerspace.min'

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
	optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /.*min.*/,
      }),
    ],
  }
};
