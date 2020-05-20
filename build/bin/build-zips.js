
const { filePath, prefix, getZipPath } = require('../helper')
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const rm = require('rimraf')
const archiver = require('archiver')
const appId = require(filePath('config/bundleInfo')).APPID_MAP;
let zipPath = getZipPath();

console.log('zipPath', zipPath);

if (process.argv[process.argv.length - 1] === 'prod') {
  console.log(chalk.cyan('\n本次压缩环境为 =>'), chalk.cyan(process.argv[process.argv.length - 1]), '\n');
  console.log(chalk.cyan('本次压缩包所在路径 =>'), chalk.cyan(zipPath), '\n');
}

function mkdirsSync(dirname){
	if(fs.existsSync(dirname)){
		return true
	}else{
		if(mkdirsSync(path.dirname(dirname))){
			fs.mkdirSync(dirname)
			return true
		}
	}
}

class buildZips{

	constructor(){

		const files = fs.readdirSync('dist')

		mkdirsSync(zipPath)

		files.forEach(item => {

			if(/^\./.test(item)){ return true }

			//生成_archive对象，打包类型为zip
			const arch = archiver('zip')
			//创建一最终打包文件的输出流
			const output = fs.createWriteStream(`${zipPath}/${(appId[item] || appId['common'])}.zip`)

			output.on('close', () => {
				let size =  arch.pointer() / 1024
				size = size > 1024 ? (size  / 1024).toFixed(2) + 'MB' : size.toFixed(2) + 'KB'
				console.log(chalk.yellow(`${(appId[item] || appId['common'])}.zip => ${size}`))
			})

			//将打包对象与输出流关联
			arch.pipe(output)

			arch.directory(filePath('dist/' + item), `${appId[item] || appId['common']}/${item}`)
			arch.finalize()

		})
	}
}

rm(zipPath, err => {
	if(err) throw err
	new buildZips()
})

