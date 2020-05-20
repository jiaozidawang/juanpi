const { filePath, prefix } = require('./helper')
const webpack = require('webpack')
const path = require('path')
const utils = require('./utils')
const { global } = require(filePath('config'))
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const vueLoaderConfig = require('./vue-loader.conf')
const merge = require('webpack-merge')
const vuxLoader = require('vux-loader')
const compileConfClass = require('./helper/compileConfClass')
const compileConf = new compileConfClass()
const PostCompilePlugin = require("webpack-post-compile-plugin");
const TransformModulesPlugin = require("webpack-transform-modules-plugin");
const config  = require('../config');

const ASSETS = {
  image: process.env.NODE_ENV === 'development' ? config.dev.xpath.image.to : config.build.xpath.image.to,
  icon: process.env.NODE_ENV === 'development' ? config.dev.xpath.icon.to : config.build.xpath.icon.to
};

// console.log('ASSETS', ASSETS, config.build.xpath.image.to);

const webpackConfig = merge(compileConf.entry(), compileConf.passConf(), {
  externals: {...compileConf.externalConf(), "ENGINEUI": "window.ENGINEUI"},
  resolve: {
    extensions: [".js", ".vue", ".json", ".less"],
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
      {
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [utils.resolve("src"), utils.resolve("test")],
        options: {
          fix: true,
          formatter: require("eslint-friendly-formatter")
          // 不符合Eslint规则时只警告(默认运行出错)
          // emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: vueLoaderConfig
          },
          {
            loader: 'x-path-loader',
            options: {
              rules: process.env.NODE_ENV === 'production' ? config.build.xpath : config.dev.xpath
            }
          },
          {
            loader: 'muti-theme-bg-loader',
            options: {
              rules: config.themes
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'x-path-loader',
            options: {
                rules: process.env.NODE_ENV === 'production' ? config.build.xpath : config.dev.xpath
            }
          }
        ],
        include: [
          utils.resolve("src"),
          utils.resolve("core")
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        oneOf: [
          {
            resourceQuery: /base64/,
            use: ["url-loader"]
          },
          {
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 5000,
                  name: utils.assetsPath("img/[name].[hash:7].[ext]")
                }
              },
              {
                loader: "img-loader",
                options: {
                  pngquant: {
                    quality: 80
                  }
                }
              }
            ]
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 1,
          name: utils.assetsPath("fonts/[name].[ext]")
        }
      },
      {
        test: /\.(svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 1,
          name: utils.assetsPath("svg/[name].[ext]")
        }
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(filePath("releaseConf/vendor-manifest.json"))
    }),
    new webpack.DefinePlugin({
      ASSETS: JSON.stringify(ASSETS)
    }),
    // cube-ui 相关
    new PostCompilePlugin(),
    new TransformModulesPlugin()
  ].concat(compileConf.plugins())
});


// 配置vux主题
let vuxTheme = {
  name: 'less-theme',
  path: 'core/public/less/vuxTheme.less'
};

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui', 'duplicate-style', vuxTheme]
})
