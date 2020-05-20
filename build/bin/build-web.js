let chalk = require('chalk')
let express = require('express')
let app = express()
let config = require('../../config')
let port = config.dev.webport || process.env.PORT || config.dev.port

console.log('> Starting web server...')
app.use('/', express.static(config.build.assetsRoot))
console.log(`> Proxy [/] to [${config.build.assetsRoot}]`)
app.listen(port)
console.log('> Listening at http://localhost:' + port + '...\n')
console.log(chalk.green('  Done Listen successfully\n'))