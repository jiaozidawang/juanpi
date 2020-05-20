const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const chalk = require('chalk');
const rm = require("rimraf");
const fse = require("fs-extra");
const archiver = require('archiver');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const resolve = dir => path.join(__dirname, '..', dir);

let env = process.argv.slice(2)[0];

env = env ? env : 'prod';

const ENV_CONF = require(resolve(`config/${env}.env.js`)).config;
const {virtualHost, workspace} = ENV_CONF;
const VHOST = `${virtualHost}/${workspace}/common/`;


const ASSETS_URL = env == 'prod'
? ENV_CONF.ASSETS_URL
: 'http://183.63.131.115:4001/perbank/static/images/integration/nmb/advpicture/h5_product'


console.log(chalk.green('====== 虚拟域名地址 ======'), chalk.yellow(VHOST.replace('common/', '')));

class EngineHandler {
  constructor() {
      this.TAG = 'EngineHandler';
  }
  apply(compiler) {

    compiler.plugin('emit', function(compilation, callback) {

      const assets = compilation.assets

      for(const key in assets) {
        if(/\.js$/.test(key)) {
          delete assets[key];
        } else {
          const data = fs.readFileSync(resolve(`engineui/engine-source/${key}`)).toString()
          let text = assets[key].children[0]._value;
          text = data + assets[key].children[0]._value;
          text = text.replace(new RegExp('http://img.emoji', 'g'), ASSETS_URL + '/emoji/');
          text = text.replace(new RegExp('http://img.asset', 'g'), ASSETS_URL + '/common/');
          // text = text.replace(new RegExp('http://img.emoji', 'g'), VHOST.replace('common', 'emoji'));
          // text = text.replace(new RegExp('http://img.asset', 'g'), VHOST);
          assets[key].children[0]._value = text;
        }
      }

      // 功能完成后调用 webpack 提供的回调。
      callback();
    });

  }
}


const webpackConf = {
  entry: {
    'theme-default': resolve('engineui/build/theme-default.js'),
    'theme-personal': resolve('engineui/build/theme-personal.js'),
    'theme-advanced': resolve('engineui/build/theme-advanced.js')
  },
  output: {
    path: resolve('static'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([ 'css-loader', 'sass-loader' ])
      }
    ]
  },
  plugins: [
    new EngineHandler(),

    new CleanWebpackPlugin(),

    new CopyWebpackPlugin([
      {
        from: resolve('engineui/engine-source/libs.css'),
        to: resolve('static/libs.css'),
        toType: 'file',
        transform(content, path) {
            let text = content.toString();
            text = text.replace(new RegExp('http://img.emoji', 'g'), ASSETS_URL + '/emoji/');
            text = text.replace(new RegExp('http://img.asset', 'g'), ASSETS_URL + '/common/');
            return text;
        }
      },
      {
        from: resolve('engineui/engine-source/libs.js'),
        to: resolve('static/libs.js'),
        toType: 'file',
        transform(content, path) {
            let text = content.toString();
            text = text.replace(new RegExp('http://img.emoji', 'g'), ASSETS_URL + '/emoji');
            text = text.replace(new RegExp('http://img.asset', 'g'), ASSETS_URL + '/common');
            return text;
        }
      },
    ]),

    new optimizeCss({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),

    new ExtractTextPlugin({
      filename: '[name].css'
    }),
  ]
}

function getZipSize (bit) {
  let size =  bit / 1024;
  size = size > 1024 ? (size  / 1024).toFixed(2) + 'MB' : size.toFixed(2) + 'KB';
  return size
}

webpack(webpackConf, (err, stats) => {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan(' engineui build complete.\n'));

  if(!process.argv.slice(2)[1] || process.argv.slice(2)[1] !== 'zip' ) {
    return
  }

  // rm(resolve('dist/engineui'), err => {
  //   if (err) throw err;

  //   let vHost = virtualHost.replace(/(http|https)\:\/\//, '')
  //   const from = resolve("engineui/libs");
  //   const to = path.join(resolve("dist"), 'engineui', vHost, workspace);

  //   fse.copySync(from, to);

  //   console.log(chalk.cyan(' engineui copy complete \n'));


  //   const file = fse.readdirSync('dist/engineui')[0];

  //   const outDir = resolve('dist/_zips');

  //   if(!fse.existsSync(outDir)) {
  //     fse.mkdirSync(outDir);
  //   }

  //   const arch = archiver('zip');
  //   const output = fse.createWriteStream(`${outDir}/20200000.zip`);

  //   output.on('close', () => {

  //     let size =  getZipSize(arch.pointer())

  //     console.log(chalk.yellow(`20200000.zip => ${size}`))

  //   })

  //   //将打包对象与输出流关联
  //   arch.pipe(output)

  //   arch.directory(resolve('dist/engineui/' + file), `20200000/${file}`)

  //   arch.finalize()

  //   console.log(chalk.cyan(' engineui zip complete\n'));
  // })


})




