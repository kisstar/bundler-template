const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getCssLoaderConfig(isDevelopment) {
  const config = {
    test: /\.(le|c)ss$/i,
    use: [
      isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {
                  // 其他选项
                },
              ],
            ],
          },
        },
      },
      'less-loader',
    ],
  };

  return config;
}

module.exports = getCssLoaderConfig;
