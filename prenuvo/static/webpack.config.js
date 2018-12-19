const common = require('./webpack/webpack.common');
const webpackMerge = require('webpack-merge');
const envConfig = require(`./webpack/webpack.dev.js`);
module.exports = webpackMerge(common, envConfig);
