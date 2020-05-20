const path = require('path')
const _ = require('lodash')
const fs = require('fs')
const chalk = require('chalk')
const dev = process.env.NODE_ENV == 'development'
const glob = require("glob")
const monment = require('moment');

let currentDate = monment().format('YYYYMMDD');


const filePath = arg => path.posix.join(process.cwd(), arg)

exports.filePath = filePath;

exports.getZipPath = (env, fn) => {
  env = env || process.argv[process.argv.length - 1];
  if (env === 'prod' && fn !== 'clean') {
    return path.posix.join(process.cwd(), 'prod/' + currentDate)
  }
  if (fn === 'clean') {
    return env === 'prod' ? path.posix.join(process.cwd(), 'prod/' + currentDate ) : path.posix.join(process.cwd(), 'dist')
  }
  return path.posix.join(process.cwd(), 'dist/_zips')

}

exports.argv = () => {

	const packageName = _.compact(process.argv.splice(2))
	const from = packageName.shift()
	const env = from === 'dev' ? 'dev' : packageName.shift()

	return {
		from,
		packageName,
		env
	}

}

exports.prefix = ({virtualHost, workspace}) => {
  const location = virtualHost.match(/(h?t?t?p?s?:?\/?\/)([a-zA-Z0-9\.\-\:]+)/)
	return {
		host: location[2],
		protocol: location[1],
		workspace,
		virtualHost
	}
}

exports.mklog = packageName => {

	const errTxt = name => {
		return `======== ${name} start ========
		发生一个严重错误导致打包中断，请前往检查！！
		======== ${name} end ======== \n\n`
	}

	const log = filePath('dist/errorLog.txt')
	fs.appendFile(log, errTxt(packageName), 'utf8', err => {
		if (err) throw err
	})
}

exports.mkReleaseConf = compileConf => {
	const filePath = arg => path.posix.join(process.cwd(), arg)
	const packageId = require(filePath('config/bundleInfo')).APPID_MAP
	const exclude = require(filePath('config')).build.exclude
	const packageName = glob.sync('src/modules/*/conf.json').map(item => item.split('/')[2])

	const releaseConf_h5 = {}
	const releaseConf_native = {}

	packageName.forEach(item => {
		if(!dev && exclude.includes(item)){
			return true
		}

		const conf = require(filePath(`src/modules/${item}/conf.json`))

		for(let m in conf){

			for(let p in conf[m]){


				if(conf[m][p].pushParam && _.isEmpty(conf[m][p].pushParam) === false){
					releaseConf_native[`${item}/${m}/${p}`] = conf[m][p].pushParam
				}

				let pageConf = _.omitBy(conf[m][p], (value, key) => {
					return ((key === 'needLogin' && value === true) || key === 'title' || key === 'injectJS' || key === 'injectCSS')
				})

				if(_.isEmpty(pageConf) === false){
					releaseConf_h5[`${item}/${m}/${p}`] = pageConf
				}
			}
		}
	})

	fs.writeFileSync(filePath('releaseConf/releaseConf_h5.json'), JSON.stringify(releaseConf_h5))
	fs.writeFileSync(filePath('releaseConf/releaseConf_native.json'), JSON.stringify(releaseConf_native))

	console.log(chalk.cyan('releaseConf complete.\n'))

	return compileConf
}

