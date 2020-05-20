const rm = require('rimraf')
const chalk = require('chalk')
const { filePath, getZipPath } = require('../helper')

let zipPath = getZipPath('', 'clean');

rm(zipPath, err => {
	if(err) throw err
  console.log(chalk.yellow(`${zipPath} 目录删除成功！！\n`));
})
