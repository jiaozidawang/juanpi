const fs = require('fs')
const path = require('path')

module.exports = class userDefinedPlugin{
	constructor(){
		//HtmlWebpackIncludeAssetsPlugin
	}
	apply(compiler){

		// const reg = new RegExp("^" + global.externalsPrefix + "/")
		// let injectJS = []

		// compiler.plugin('compilation', (compilation, data) => {
			
		// 	data.normalModuleFactory.plugin('parser', (parser, options) => {
				
		// 		parser.plugin('import', (statement, source) => {

		// 			if(reg.test(source)){
		// 				const _injectJS = source.replace(reg, '')
		// 				if(injectJS.indexOf(_injectJS) == -1){
		// 					injectJS.push(_injectJS)
		// 				}
		// 			}
		// 		})
		// 	})

		// 	compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {

		// 		while(injectJS.length > 0) {
		// 			htmlPluginData.assets.js.push(injectJS.pop())
		// 		}
		// 		callback(null, htmlPluginData)
		// 	})
		// })

		compiler.plugin('emit', (compilation, callback) => {
			for(let i in compilation.assets){
				if(/manifest\.css$/.test(i)){
					if(compilation.assets[i]._value){
						let res = compilation.assets[i]._value
						res = res.replace(/url\(\.\.\/img\//g, 'url(./img/')
							.replace(/url\(\.\.\/svg\//g, 'url(./svg/')
						compilation.assets[i]._value = res
					}
				}
			}
			callback()
		})
	}
}

