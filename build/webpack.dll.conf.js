const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')

const dll = {
  entry: {
    vendor: [
      'vue/dist/vue.runtime.esm',
      'vuex',
      'fastclick',
      'babel-polyfill'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins:[
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../releaseConf/[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.HashedModuleIdsPlugin({hashDigestLength:6})
  ]
}

webpack(dll, (err, stats) => {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  构建完成\n'))
  console.log(chalk.yellow(
    '  提示: 构建的文件只能用于Http服务里\n' +
    '  直接点击打开将不起作用\n'
  ))

})
