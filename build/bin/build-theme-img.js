const path = require("path");
const chalk = require("chalk");
const fse = require("fs-extra");
const archiver = require('archiver')

const env = process.argv.slice(2)[0];

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


let {virtualHost, workspace} = require(path.resolve(__dirname, `../../config/${env}.env.js`)).config;
virtualHost = virtualHost.replace('https://', '');

const filePath = file =>  path.resolve(__dirname, '../../', file);

const copy = (appid, dirname) => {
    const from = filePath(`src/assets/${dirname}`);
    const to = filePath(`dist/${dirname}/${virtualHost}/${workspace}/${dirname}`);
    fse.copySync(from, to);
    compress(appid, dirname)
}

const compress = (appid, dirname) => {

    const zipPath = path.posix.join(process.cwd(), 'dist/_zips');
    mkdirsSync(zipPath);

    const arch = archiver('zip', {
        zlib: { level: 9 } // 设置压缩级别
    });

    // 创建文件输出流
    const output = fse.createWriteStream(`${zipPath}/${appid}.zip`);

    const file = fse.readdirSync(`dist/${dirname}`)[0];

    if(/^\./.test(file)){ return true }

    // 文件输出流结束
    output.on('close', () => {
        let size =  arch.pointer() / 1024
        size = size > 1024 ? (size  / 1024).toFixed(2) + 'MB' : size.toFixed(2) + 'KB'
        console.log(chalk.yellow(`${appid}.zip => ${size}`))     
    })

    //通过管道方法将输出流存档到文件
    arch.pipe(output)

    arch.directory(filePath(`dist/${dirname}/` + file), `${appid}/${file}`)

    arch.finalize();

    console.log(chalk.cyan('\n '+  dirname +' 已压缩\n'));

}


copy('20200001', 'icon');
copy('20200002', 'image');


