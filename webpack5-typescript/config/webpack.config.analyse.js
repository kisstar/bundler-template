const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const prodConfig = require('./webpack.config.prod');

const analyseConfig = {
  plugins: [new BundleAnalyzerPlugin()],
};

module.exports = merge(prodConfig, analyseConfig);
