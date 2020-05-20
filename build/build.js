require('./check-versions')()

process.env.NODE_ENV = 'production'
const { filePath } = require('./helper')
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require(filePath('config'))
var webpackConfig = require('./webpack.prod.conf')
var util = require('./utils')

const {envConf} = webpackConfig.passConf
delete webpackConfig.passConf

process.on('message', m => {

    var spinner = ora(`${m.cur}/${m.len} building for production...`)
        spinner.start()

    rm(webpackConfig.output.path, err => {
        if (err) throw err

        webpack(webpackConfig, function (err, stats) {
            spinner.stop()
            if (err) throw err

            if(m.len <= 1){
                process.stdout.write(stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }) + '\n\n')
            }

            console.log(chalk.cyan('  Build complete.\n'))
            console.log(chalk.yellow(
                '  Tip: built files are meant to be served over an HTTP server.\n' +
                '  Opening index.html over file:// won\'t work.\n'
            ))
            process.exit(0)
        })
    
    })

})