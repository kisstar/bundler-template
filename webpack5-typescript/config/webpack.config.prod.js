const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const getHtmlPluginConfig = require('../lib/html-plugin-config');
const getCssLoaderConfig = require('../lib/css-loader-config');
const getAssetLoaderConfig = require('../lib/asset-loader.cofig');
const baseConfig = require('./webpack.config.base');

const isDevelopment = false;

const prodConfig = {
  mode: 'production',
  devtool: 'nosources-source-map',
  output: {
    clean: true,
    filename: 'js/[name]_[contenthash:8].js',
  },
  module: {
    rules: [
      getCssLoaderConfig(isDevelopment),
      ...getAssetLoaderConfig(isDevelopment),
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(), // 压缩 JavaScript，会移除无用代码
    ],
    splitChunks: {
      chunks: 'all', // 提取公共模块
      usedExports: true, // 标记无用代码
    },
  },
  plugins: [
    new HtmlWebpackPlugin(getHtmlPluginConfig(isDevelopment)),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:8].css',
    }),
  ],
};

module.exports = merge(baseConfig, prodConfig);
