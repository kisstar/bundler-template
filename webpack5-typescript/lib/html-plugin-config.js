const { resolve } = require('./utils');

const baseConfig = {
  title: 'Webpack Config',
  favicon: resolve('./public/favicon.ico'),
  template: resolve('./public/template.html'),
};

function getHtmlPluginConfig(isDevelopment) {
  const config = {
    ...baseConfig,
  };

  if (!isDevelopment) {
    Object.assign(config, {
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    });
  }

  return config;
}

module.exports = getHtmlPluginConfig;
