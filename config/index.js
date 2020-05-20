///// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
const _ = require('lodash')
var ora = require('ora');
const chalk =  require('chalk');
const { argv } = require('../build/helper');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const getIPAdress = () => {
    let interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
}


function getAssetsUrl (env) {
    let ASSETS_URL = 'http://183.63.131.115:4001/perbank/static/images/integration/nmb/advpicture/h5_product';
    const WORK_SPACE = process.argv[3];
    try {
        /**
         *  公共包方案
            const envConfig = require(path.resolve(__dirname, `${WORK_SPACE}.env.js`)) || {};
            const { virtualHost, workspace } = envConfig.config;
            ASSETS_URL = `${virtualHost}/${workspace}`
            return ASSETS_URL;
         */

        if(WORK_SPACE === 'prod') {
          ASSETS_URL = 'https://perbank.ghbank.com.cn/perbank/static/images/integration/h5_product';
        }
        if(process.argv[2] === 'dev') {
          ASSETS_URL = '/mock/img'
        }


        return ASSETS_URL;

    } catch (err) {
        console.log(chalk.yellow('\n\n\n=====================> 开发环境准备中...\n'));
        return ''
    }
}

// 虚拟域名后缀
const ASSETS_URL = getAssetsUrl();
// console.log("====== ASSETS_URL ======", ASSETS_URL)
console.log(chalk.yellow('ASSETS_URL => ', ASSETS_URL, '\n'));

module.exports = {
    //完整的依赖解耦处理需要换AMD架构
    dll: {
        //业务基础（基础服务、组件）
        main_library: {
          trunks: ['@/main', '@core/bridge']
        },
        // engine_ui: {
        //     trunks: ['@core/lib/engineUI/libs.js']
        // }
        //模板库
        // template_library: {
        //     trunks: ['@templateFrame/frame ']
        // }
    },
    externals: {
        // 'echart': {
        //     external: 'echart',
        //     js: 'echart.js'
        // }
    },
    themes: ['default', 'personal', 'advanced'],
    alias: {
        '@': resolve('src'),
        '@bridge': resolve('core/bridge'),
        '@core': resolve('core'),
        '@public': resolve('core/public'),
        '@comp': resolve('core/public/components'),
        '@comps': resolve('core/public/components/project'),
        '@base': resolve('core/public/components/base'),
        '@assets': resolve('src/assets'),
        '@utils': resolve('core/utils'),
        '@engine': resolve('core/lib/engineUI')
    },
    build: {
        env: require('./prod.env').envConfig,
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: './',
        assetsPublicPath: '../',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: false,

        externals: {'Vue': 'vue'},
        //需要排除的包
        exclude: ['demo'],
        xpath: {
            image: {
                from:'http://img.asset/',
                to: `${ASSETS_URL}/image/`
            },
            icon: {
                from: 'http://icon.asset/',
                to: `${ASSETS_URL}/icon/`
            }
        }
    },
    dev: {
        env: require('./dev.env').envConfig,
        port: 8082,
        webport: 10001,
        autoOpenBrowser: false,
        assetsSubDirectory: './',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                target: 'http://flameapp.cn/chee-mpaasService/',
                pathRewrite: {"^/api" : ""}
            }
        },
        externals: {'Vue': 'vue'},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,

        xpath: {
            icon: {
                from: 'http://icon.asset/',
                to: `${ASSETS_URL}/icon/`
            },
            image: {
                from: 'http://img.asset/',
                to: `${ASSETS_URL}/image/`
            }
        }
    }
}
