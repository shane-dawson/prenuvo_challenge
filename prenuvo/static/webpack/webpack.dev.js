const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          emitWarning: process.env.NODE_ENV !== 'production',
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false,
              camelCase: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    compress: true,
    hot: false,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
