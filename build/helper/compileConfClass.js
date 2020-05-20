const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const glob = require("glob")
const _  = require('lodash')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInjectPlugin = require('../plugins/HtmlWebpackInjectPlugin')
const dev = process.env.NODE_ENV == 'development'
const { filePath, prefix, argv, mkReleaseConf } = require('./index')
const configuration = require(filePath('config'))
const { exclude } = configuration.build

class compileConfClass {

  constructor(opt = {}) {
    //取出所有来自命令行的参数
    this.argv = opt.isAuto ? opt : argv()
    //根据命令行传入的环境变量到config取出对应的配置
    this.config = require(`${filePath(`config/${this.argv.env}.env.js`)}`)

    this.compileConfig = this._checkPackageName()

    //外部映射配置
    this.externals = {}
    this.resourceJsMap = {}
    this.resourceCssMap = {}

    //初始化外部映射配置
    if (!dev) {
      //非开发模式 开启外部引用
      this._initExternalDll()
    }
    this._initExternal()
  }

	_initExternal () {
		//获取配置中的外部映射代码
		let externals = configuration.externals || {}
		const {virtualHost,workspace} = this.config.config
		let getUrlPath = (name) => {
			let filePath = name
			let httpExp = /^http(s)?:\/\//
			return httpExp.test(name || '') ? name : (dev ?  '' : `${virtualHost}/${workspace}`) + `/${filePath}`
		}

		Object.keys(externals).forEach((key) => {
			let externalObj, externalContent
			externalObj = externals[key] || {}
			externalContent = externalObj.external || key

			//注入外部变量标示
			this.externals[key] = externalContent

			//注入js
			if(externalObj.js){
				this.resourceJsMap[externalContent] = [getUrlPath(externalObj.js || '')]
			}

			//注入css
			if(externalObj.css){
				this.resourceCssMap[externalContent] = [getUrlPath(externalObj.css || '')]
			}
		})
	}

	/**
	 * 结合引用插件与外部插件解耦合
	 */
	_initExternalDll () {
		//外部引用配置
		let dll = configuration.dll || {}
		const {virtualHost,workspace} = this.config.config
		let getUrlPath = (name) => {
			let filePath = `common/${name}.dll.js`
			return (dev ?  '' : `${virtualHost}/${workspace}`) + `/${filePath}`
		},
		dependTree = (paths, dependKey) => {
			let dependInfo = dll[dependKey] || {}
			let depends = dependInfo.depends || []

			//依赖归集
			paths.unshift(getUrlPath(dependKey))
			depends = (depends.slice(0)).reverse()
			depends.forEach((dependName) => {
				dependTree(paths, dependName)
			})
		}

		Object.keys(dll).forEach((dllKey) => {
			let depends = this.resourceJsMap[dllKey] = []
			//依赖树处理
			dependTree(depends, dllKey)
		})
	}

	_checkPackageName(){

		if(this.argv.packageName.length <= 0){
			this.argv.packageName = glob.sync('src/modules/*/conf.json').map(item => {
				return item.split('/')[2]
			})

			!dev && (this.argv.packageName = _.difference(this.argv.packageName, exclude))
		}

		return []
	}

	_HtmlWebpackPlugin(){

		const hwp = []

		const minify = dev ? Object.create(null) : {
			collapseWhitespace: true,
			removeAttributeQuotes: true,
			minifyJS: true,
			minifyCSS: true
		}

		this.compileConfig.forEach(item => {

			const {virtualHost,workspace} = this.config.config
			hwp.push(
				new HtmlWebpackPlugin({
					title: item.title,
					minify,
					chunks: dev ? ['manifest', item.key] : ['vendor', 'manifest', item.key],
					inject: true,
					chunksSortMode: 'manual',
					template: 'template.html',
					filename: `${item.key}.html`,
					vhost: dev ?  '' : `${virtualHost}/${workspace}`,
					injectJS: item.injectJS,
					injectCSS: item.injectCSS
				})
			)

		})
		return hwp
	}

	_HtmlWebpackInjectPlugin () {
		let plugins = []
		//依赖注入插件
		plugins.push(new HtmlWebpackInjectPlugin({resourceJs: this.resourceJsMap, resourceCss: this.resourceCssMap}))
		return plugins
	}

	_DllReferencePlugin (dllkey) {
		let plugins = []
		let commonConfigPath = filePath('releaseConf/common')
		let _this = this

		if(!fs.existsSync(commonConfigPath)){
			return plugins
		}

		if(!dllkey){
			//全部依赖（用于业务包引用）
			glob.sync('*.json', {cwd: commonConfigPath, dot:!0, ignore:[".svn/**",".git/**"]}).forEach(function(file){
				plugins.push(new webpack.DllReferencePlugin({
					context: path.join(__dirname, '..'),
					manifest: _this._filterDllContent(require(path.join(commonConfigPath, file)))
				}))
			})
		}else{
			//指定dll的引用依赖（用于生成独立库文件）
			let dll = configuration.dll || {}
			let dllInfo = dll[dllkey] || {}
			let depends = dllInfo.depends || []

			depends.forEach((dependKey) => {
				plugins.push(new webpack.DllReferencePlugin({
					context: path.join(__dirname, '..'),
					manifest: _this._filterDllContent(require(path.join(commonConfigPath, `${dependKey}-manifest.json`)))
				}))
			})
		}

		return plugins
	}

	_filterDllContent (manifest) {
		//过滤manifest的内容，避免在引用时一些非关键模块 依赖而注入
		let content = manifest.content
		Object.keys(content).forEach((key) => {
      //node_modules、图片不共享引用，避免依赖混乱
			if(/\/node_modules\//.test(key) || /\.(gif|jpg|jpeg|bmp|png|ico)$/.test(key)){
				delete content[key]
			}
		})
		return manifest
	}

	getMultiEnteries(){

		const compileConf = []

		this.argv.packageName.forEach(packageName => {

			const packageConf = require(filePath(`src/modules/${packageName}/conf.json`))

			for(let m in packageConf){

				for(let p in packageConf[m]){

					const { title, needLogin, injectJS = [], injectCSS = [] } = packageConf[m][p]

					compileConf.push({
						key: dev ? `${packageName}/${m}/${p}` : `${m}/${p}`,
						entryFile: filePath(`src/modules/${packageName}/${m}/${p}/main.js`),
						title,
						needLogin,
						packageName,
						injectJS,
						injectCSS
					})
				}
			}
		})

		this.mkReleaseConf(compileConf)

		return compileConf
	}

	mkReleaseConf () {
		mkReleaseConf()
	}

	entry(){
		const entry = {}
    	this.compileConfig = this.getMultiEnteries()
		this.compileConfig.forEach(item => entry[item.key] = item.entryFile)
		return { entry }
	}

	definePlugin () {
		const ASSETS = {
			image: process.env.NODE_ENV === 'development' ? configuration.dev.xpath.image.to : configuration.build.xpath.image.to,
			icon: process.env.NODE_ENV === 'development' ? configuration.dev.xpath.icon.to : configuration.build.xpath.icon.to
    };
		return [new webpack.DefinePlugin({
			'process.env': this.config.envConfig,
			ENVCONF: this.config.envConfig,
			GLOBALPACKAGEURL: '"' + this.config.config.virtualHost + '/' + this.config.config.workspace + '"',
			PACKAGEID: require(filePath('config/bundleInfo')).APPID_MAP,
			PAGEINFO: require(filePath('releaseConf/releaseConf_h5.json')),
			ASSETS: JSON.stringify(ASSETS)
		})]
	}

	plugins(){
		let plugins = [
			...this.definePlugin(),
			...this._HtmlWebpackPlugin(),
			...this._HtmlWebpackInjectPlugin(),
		]

		if(!dev){
			//非开发模式引用外部文件
			plugins = plugins.concat(this._DllReferencePlugin())
		}

		return plugins
	}

	externalConf (exclude) {
		//获取外键配置
		let externals = {}
		let val
		for(let key in this.externals){
			val = this.externals[key]
			if(val != exclude){
				externals[key] = val
			}
		}
		return externals
	}

	aliasConf () {
		//别名配置外放
		return configuration.alias
	}

	dllConf () {
		//外部引用配置
		let dll = configuration.dll || {}
		let entry = {}
		let gravity = {}

		Object.keys(dll).forEach((dllKey) => {
			let dllInfo = dll[dllKey]
			let depends = dllInfo.depends || []
			entry[dllKey] = (dll[dllKey] || {}).trunks || []

			//记录当前权重
			if(gravity[dllKey]){
				gravity[dllKey] += 1
			}else{
				gravity[dllKey] = 1
			}

			//计算依赖权重
			depends.forEach((dependKey) => {
				if(gravity[dependKey]){
					gravity[dependKey] += 1
				}else{
					gravity[dependKey] = 1
				}
			})
		})

		//构建依赖权重
		let dependRelations = []
		for(let key in gravity){
			let g = gravity[key]
			let bAdd = false
			if(dependRelations.length > 0){
				for(let i = 0; i < dependRelations.length; i++){
					if(gravity[dependRelations[i]] < g){
						bAdd = true
						dependRelations.splice(i, 0, key)
						break
					}
				}
			}
			!bAdd && dependRelations.push(key)
		}

		//配置文件刷新
		mkReleaseConf()

		return {
			keys: dependRelations,
			entry
		}
	}

	passConf(){
		return dev ? {} :
		{
			passConf: {
				envConf: prefix(this.config.config),
				packageName: this.argv.packageName[0]
			}
		}
	}
}

module.exports = compileConfClass
