const chalk = require("chalk");
const path = require("path");
const { filePath, prefix } = require("../helper");
const rm = require("rimraf");
const fse = require("fs-extra");
const compileConfClass = require("../helper/compileConfClass");
const compileConf = new compileConfClass();
const { virtualHost, workspace } = prefix(compileConf.config.config);
const archiver = require('archiver')
const { getZipPath } = require('../helper')

let zipPath = getZipPath();

console.log(chalk.cyan("\n ENGINEUI 开始打包\n"));

function mkdirsSync(dirname){
	if(fse.existsSync(dirname)){
		return true
	}else{
		if(mkdirsSync(path.dirname(dirname))){
			fse.mkdirSync(dirname)
			return true
		}
	}
}


let vHost = virtualHost.replace("https://", "");


rm(filePath(path.join("dist/engineui")), err => {
  if (err) throw err;

  const from = filePath("engineui/libs");
  const to = path.join(filePath("dist"), 'engineui', vHost, workspace);

  fse.copySync(from, to);
  
  console.log(chalk.cyan(" ENGINEUI 打包完成\n"));

  console.log(chalk.cyan(' ENGINEUI 开始压缩'));

  const file = fse.readdirSync('dist/engineui')[0];

  mkdirsSync(zipPath);

  if(/^\./.test(file)){ return true }

  //生成_archive对象，打包类型为zip
  const arch = archiver('zip');
  const output = fse.createWriteStream(`${zipPath}/20200000.zip`);

  output.on('close', () => {

    let size =  arch.pointer() / 1024

    size = size > 1024 ? (size  / 1024).toFixed(2) + 'MB' : size.toFixed(2) + 'KB'

    console.log(chalk.yellow(`20200000.zip => ${size}`))
    
  })


  //将打包对象与输出流关联
  arch.pipe(output)

  arch.directory(filePath('dist/engineui/' + file), `20200000/${file}`)

  arch.finalize()

  console.log(chalk.cyan('\n ENGINEUI 已压缩\n'));
});



