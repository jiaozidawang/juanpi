
const chalk = require('chalk')
const path = require('path')
const merge = require('webpack-merge')
const fs = require('fs')
const _ = require('lodash')

const { filePath } = require('../helper')
const packageJSON = require(filePath('package'))
const basePath = filePath('src/modules')

const vueTemplate = `<template>
	<m-page>
		<div class="page-main">demo</div>
	</m-page>
</template>
<script>
	export default {
		name: 'demo'
	}
</script>
`

const jsTemplate = `import Vue from 'vue'
import '@/main'
import Entry from './index.vue'
import mixins from '@core/init/mixins'

App.__vm__ = new Vue({
	mixins,
	render: h => h(Entry)
})
`

const argv = (() => {
	const [path, id] = process.argv.splice(2)
	return {
		path, id: id ? id.replace('id=', '') : undefined
	}
})()

const mkdirsSync = dirname => {
	if(fs.existsSync(dirname)){
		return true
	}else{
		if(mkdirsSync(path.dirname(dirname))){
			fs.mkdirSync(dirname)
			return true
		}
	}
}
const updatePackageJSON = () => {
	if(!argv.id) return
	const packageName = _.compact(argv.path.split('/')).shift()
	packageJSON.apps[packageName] = Number(argv.id)
	fs.writeFileSync(filePath('package.json'), JSON.stringify(packageJSON, null, 2))
}
const updatePackageConf = () => {
	const [g, m , p] = _.compact(argv.path.split('/'))
	const fileStat = fs.existsSync(path.join(basePath, g, 'conf.json'))
	const conf = !fileStat ? {} : JSON.parse(fs.readFileSync(path.join(basePath, g, 'conf.json'), 'utf-8'))
	const mkConf = {}
	mkConf[m] = {}
	mkConf[m][p] = {
		titie: 'demo',
		needLogin: false
	}

	fs.writeFileSync(path.join(basePath, g, 'conf.json'), JSON.stringify(merge(conf, mkConf), null, 2))
}
const mkPage = () => {
	const [g, m , p] = _.compact(argv.path.split('/'))
	fs.writeFileSync(path.join(basePath, g,m,p, 'index.vue'), vueTemplate)
	fs.writeFileSync(path.join(basePath, g,m,p, 'main.js'), jsTemplate)
	console.log(chalk.yellow(`${g}/${m}/${p} 目录创建成功！`))
}

if(!!argv.id && Object.values(packageJSON.apps).includes(+argv.id)){
	return console.log(chalk.yellow(`${argv.id}, 该ID已经被占用！`)) 
}

//同步创建目录
mkdirsSync(path.join(basePath, argv.path))

//更新package.json中的apps
updatePackageJSON()
// mk conf.json and update
updatePackageConf()

mkPage()

