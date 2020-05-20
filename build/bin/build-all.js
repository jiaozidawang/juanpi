const rm = require('rimraf')
const chalk = require('chalk')
const child_process = require('child_process')
const { filePath, prefix, mklog, mkReleaseConf } = require('../helper')
const compileConfClass = require('../helper/compileConfClass')
const config = require(filePath('config'))

process.stdin.resume()
process.stdin.on('data', data => {
	process.stdout.write('不要在控制台乱输!! \n')
})
process.on('SIGINT', () => {
	console.log(chalk.yellow('\n\n请勿手动中断，将无法正常统计打包编译!\n'))
	process.exit()
})



class buildAllClass extends compileConfClass {
	constructor(){
		super()
		this.message = {
			cur: 0,
			len: this.argv.packageName.length,
			fail: {}
		}
	}

	command(){
		this._run_parent_process()
	}

	_writeOutInfo(){
		const failPackage = Object.keys(this.message.fail).map(m => m + '\n')
		console.log(chalk.yellow(`\n\n成功编译${this.message.cur}/${this.message.len}个资源包\n`))
		console.log(chalk.yellow(`\n失败：${failPackage.length} \n\n ${failPackage.join('\n')}`))
	}

	_getPackageName(){
		return this.argv.packageName.shift()
	}

	_run_parent_process(){
		const packageName = this._getPackageName()
		if(!packageName){
			this._writeOutInfo()
			return process.exit()
		}
		this._run_child_process(packageName)
	}

	_run_child_process(packageName){
		const child = child_process.fork(filePath('build/build'), ['build', this.argv.env, packageName])
		child.on('exit',(code, signal) => {
			//code == 0 正常退出
			//code == 1 error
			if(code === 0){
				this.message.cur++
			}
			if(code === 1){
				this.message.fail[packageName] = true
				mklog(packageName)
			}

			this._run_parent_process()

			console.log(`子进程已退出，代码: ${code}, signal:${signal}`)
		})

		child.send({cur: String(this.message.cur), len: String(this.message.len)})
	}
}

const _buildAllClass = new buildAllClass()

_buildAllClass.command()


