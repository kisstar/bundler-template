function getAssetLoaderConfig(isDevelopment) {
  const config = [
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset',
      generator: {
        filename: `images/${
          isDevelopment ? '[name][ext]' : '[name]_[hash:8][ext]'
        }`,
      },
      parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024,
        },
      },
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: `fonts/${
          isDevelopment ? '[name][ext]' : '[name]_[hash:8][ext]'
        }`,
      },
    },
  ];

  return config;
}

module.exports = getAssetLoaderConfig;
