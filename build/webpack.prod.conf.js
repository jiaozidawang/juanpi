const { filePath } = require('./helper')
const userDefinedPlugin = require('./plugins')
var path = require('path');
var utils = require('./utils');
var webpack = require('webpack');
var config = require(filePath('config'));
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');


const {packageName} = baseWebpackConfig.passConf


var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      rules: config.dev.xpath
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
      path: filePath(`dist/${packageName}`),
      filename: '[name].js',
      publicPath:  config.build.assetsPublicPath,
      sourceMapFilename: '[name].js.map'
  },
  plugins: [
    new ParallelUglifyPlugin({
      uglifyJS: {
        output: {
          comments: false
        },
        compress: {
          dead_code: true,
          drop_console: true, //删除console.*
          // warnings: false
        }
      }
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('[name].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
                path.join(__dirname, '../node_modules')
            ) === 0
        );
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: Object.keys(baseWebpackConfig.entry),
      minChunks : 2
    }),
    new userDefinedPlugin()
  ]
});

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
            '\\.(' +
            config.build.productionGzipExtensions.join('|') +
            ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
  );
}


module.exports = webpackConfig;
