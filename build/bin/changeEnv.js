const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

const sourcePath = path.join(__dirname, '../../dist/')

const filesList = [...glob.sync(sourcePath + '/**/*.css'), ...glob.sync(sourcePath + '/**/*.js'), ...glob.sync(sourcePath + '/**/*.html')];

let envList = process.argv.slice(2);
let sourceEnv = envList[0];
let outEnv = envList[1];

let sourceEnvData = require(path.join(__dirname, `../../config/${sourceEnv}.env.js`))
let outEnvData = require(path.join(__dirname, `../../config/${outEnv}.env.js`))

const sourceStr = `${sourceEnvData.config.virtualHost}/${sourceEnvData.config.workspace}`
const outStr = `${outEnvData.config.virtualHost}/${outEnvData.config.workspace}`

console.log('\n', chalk.cyan(sourceStr), '替换', chalk.cyan(outStr), '\n');

console.log('替换文件列表', filesList);

filesList.forEach(file => {

  let dataBuffer = fs.readFileSync(file);

  let data = dataBuffer.toString();

  let newData = data.replace(new RegExp(sourceStr, 'g'), outStr)

  fs.writeFileSync(file, newData)

})
