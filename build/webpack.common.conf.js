const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')
const { filePath } = require('./helper')
const utils = require('./utils')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const vuxLoader = require('vux-loader')
const vueLoaderConfig = require('./vue-loader.conf')
var config = require(filePath('config'))
const compileConfClass = require('./helper/compileConfClass')
const compileConf = new compileConfClass()
//生成配置
compileConf.mkReleaseConf()

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const dll = {
  entry: {},
  externals: {"ENGINEUI": "window.ENGINEUI"},
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: compileConf.aliasConf()
  },
  resolveLoader: {
    modules: [
        utils.resolve('loaders/'),
        'node_modules'
    ]
  },
  module: {
    noParse: [/\.min\.js$/],
    rules: [
      ...(utils.styleLoaders({
        sourceMap: config.build.productionSourceMap
      })),
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: vueLoaderConfig,
          }],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        include: [resolve('src'), resolve('core')],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader'

      },
      {
        test: /\.(svg)(\?.*)?$/,
        loader: 'url-loader'
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '../static/common'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins:[
    new LodashModuleReplacementPlugin,
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DllPlugin({
      path: filePath('releaseConf/common/[name]-manifest.json'),
      name: '[name]',
      context: __dirname
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(filePath('releaseConf/vendor-manifest.json'))
    }),
    new webpack.HashedModuleIdsPlugin({hashDigestLength:6}),
    new ParallelUglifyPlugin({
      uglifyJS: {
        output: {
          comments: false
        },
        compress: {
          dead_code: true,
          drop_console: false, //删除console.*
          warnings: false
        }
      }
    })
  ].concat(compileConf.definePlugin())
}

let webpackConfig = vuxLoader.merge(dll, {
  plugins: ['vux-ui', 'duplicate-style']
})

function makeMultiConfig () {
  let dllConfig = compileConf.dllConf()
  let webpackConfigs = []
  dllConfig.keys.forEach((key) => {
      let dllconfig = {}
      dllconfig.entry = {}
      dllconfig.entry[key] = dllConfig.entry[key]

      let packConfig = Object.assign({}, webpackConfig, dllconfig)
      packConfig.plugins = packConfig.plugins.concat(compileConf._DllReferencePlugin(key))
      webpackConfigs.push(packConfig)
  })
  return webpackConfigs
}


webpack(makeMultiConfig(), (err, stats) => {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))

})
