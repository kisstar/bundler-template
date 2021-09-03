const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { resolve } = require('../lib/utils');
const getHtmlPluginConfig = require('../lib/html-plugin-config');
const getCssLoaderConfig = require('../lib/css-loader-config');
const getAssetLoaderConfig = require('../lib/asset-loader.cofig');
const baseConfig = require('./webpack.config.base');

const isDevelopment = true;

const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      getCssLoaderConfig(isDevelopment),
      ...getAssetLoaderConfig(isDevelopment),
    ],
  },
  devServer: {
    static: {
      directory: resolve('dist'),
    },
    port: 8080,
    compress: true,
    open: true,
  },
  plugins: [new HtmlWebpackPlugin(getHtmlPluginConfig(isDevelopment))],
};

module.exports = merge(baseConfig, devConfig);
