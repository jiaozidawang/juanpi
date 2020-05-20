const { filePath } = require('./helper')
var utils = require('./utils')
var webpack = require('webpack')
var config = require(filePath('config'))
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require('./helper/address.js')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})



var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      extract: true,
      rules: config.dev.xpath
    })
  },
  output: {
    path: config.dev.assetsPublicPath,
    filename: '[name].js',
    // publicPath: require('./helper/address.js') + config.dev.assetsPublicPath,
    publicPath: config.dev.assetsPublicPath,
    sourceMapFilename: '[name].js.map'
  },
  // cheap-module-eval-source-map is faster for development
  devtool: false,
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new ExtractTextPlugin({
      filename: utils.assetsPath('[name].css')
    }),

    // https://github.com/ampedandwired/html-webpack-plugin
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: Object.keys(baseWebpackConfig.entry)
    }),
    new FriendlyErrorsPlugin(),
    new CopyWebpackPlugin([
      {
          // from: path.resolve(__dirname, '../engineui/libs'),
          from: path.resolve(__dirname, '../static'),
          to: config.dev.assetsSubDirectory,
          ignore: ['.*', 'vue.min.js', 'vuex.min.js']
      }
  ])
  ]
})

module.exports = webpackConfig
