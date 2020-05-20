require('../check-versions')()

process.env.NODE_ENV = 'production'

var chalk = require('chalk')
var webpack = require('webpack')
var webpackConfig = require('../webpack.prod.conf')

delete webpackConfig.passConf

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerHost: '127.0.0.1',
    analyzerPort: 8899
}));

webpack(webpackConfig, function (err, stats) {
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