const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { resolve } = require('../lib/utils');

module.exports = {
  mode: 'none',
  entry: './src/index.ts',
  output: {
    path: resolve('dist'),
    filename: 'js/main.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [resolve('node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              exclude: [
                // \\ for Windows, \/ for Mac OS and Linux
                /node_modules[\\\/]core-js/,
                /node_modules[\\\/]webpack[\\\/]buildin/,
              ],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                  },
                ],
              ],
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
