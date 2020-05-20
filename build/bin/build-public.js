const chalk = require("chalk");
const path = require("path");
const { filePath, prefix } = require("../helper");
const rm = require("rimraf");
const fse = require("fs-extra");
const compileConfClass = require("../helper/compileConfClass");
const compileConf = new compileConfClass();
const { host, virtualHost, workspace } = prefix(compileConf.config.config);
const archiver = require("archiver");
const resolve = dir => path.join(__dirname, '../../', dir);

// console.log(chalk.cyan("\n 公共包开始打包\n"));

let vHost = virtualHost.replace("https://", "");

function getZipSize (bit) {
  let size =  bit / 1024;
  size = size > 1024 ? (size  / 1024).toFixed(2) + 'MB' : size.toFixed(2) + 'KB';
  return size
}

rm(filePath(path.join("dist", vHost, workspace)), err => {
  if (err) throw err;

  const from = filePath("static");
  const to = path.join(filePath("dist"), "common", vHost, workspace);
  fse.copySync(from, to);
  // console.log(chalk.cyan("\n 公共包打包结束\n"));

  const file = fse.readdirSync("dist/common")[0];

  const outDir = resolve("dist/_zips");

  if (!fse.existsSync(outDir)) {
    fse.mkdirSync(outDir);
  }

  const arch = archiver("zip");
  const output = fse.createWriteStream(`${outDir}/20190000.zip`);

  output.on("close", () => {
    let size = getZipSize(arch.pointer());

    console.log(chalk.yellow(`20190000.zip => ${size}`));
  });

  //将打包对象与输出流关联
  arch.pipe(output);

  arch.directory(resolve("dist/common/" + file), `20190000/${file}`);

  arch.finalize();

  console.log(chalk.cyan(" 公共包压缩完成\n"));
});
