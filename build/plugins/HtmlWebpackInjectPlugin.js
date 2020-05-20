module.exports = class OptimizePlugin {

    constructor({resourceJs, resourceCss}) {
        this.resourceJs = resourceJs
        this.resourceCss = resourceCss
    }

    apply (compiler) {
        let _this = this

        compiler.plugin('compilation', (compilation) => {
            let chunkJsMap = {}
            let chunkCssMap = {}
            
            compilation.plugin('optimize-tree', (chunks, modules, callback) => {
                //依赖模块树遍历
                modules.forEach(function(moduleObj){
                    let jsResource = _this.resourceJs[moduleObj.request];
                    let cssResource = _this.resourceCss[moduleObj.request];

                    (jsResource || cssResource) && moduleObj.chunks.forEach(function(chunk) {
                        if(jsResource){
                            let jsPaths = chunkJsMap[chunk.name] = chunkJsMap[chunk.name] || []
                            jsResource.forEach((resourcePath) => {
                                jsPaths.unshift(resourcePath)
                            })
                        }

                        if(cssResource){
                            let cssPaths = chunkCssMap[chunk.name] = chunkCssMap[chunk.name] || []
                            cssResource.forEach((resourcePath) => {
                                cssPaths.unshift(resourcePath)
                            })
                        }
                    })
                })
                callback()
            })

            compilation.plugin("html-webpack-plugin-before-html-generation",function(e, t){
                //将页面依赖的chunk中的依赖的外部模块放入页面依赖中
                for(var chunk in e.assets.chunks){
                    chunkJsMap[chunk] && chunkJsMap[chunk].forEach(function(path){
                        e.assets.js.unshift(path)
                    })

                    chunkCssMap[chunk] && chunkCssMap[chunk].forEach(function(path){
                        e.assets.css.unshift(path)
                    })
                }

                //排重处理
                exclusion(e.assets.js)
                exclusion(e.assets.css)
                t(null, e)
            })

            //数组排重
            function exclusion(arr){
                let map = {}, path

                for(let i = 0; i < arr.length; i++){
                    path = arr[i]
                    if(!(path in map)){
                        map[path] = true
                    }else{
                        arr.splice(i, 1)
                        i--
                    }
                }
            }

        })
        
    }
}