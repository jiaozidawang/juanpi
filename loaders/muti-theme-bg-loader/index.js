/* eslint no-param-reassign: 0 */
const loaderUtils = require('loader-utils');

module.exports = function (source) {
    const options = loaderUtils.getOptions(this) || {};
    const themes = options.rules || {};

    if(source.indexOf('muti-theme-style-start') > 0 && source.indexOf('muti-theme-style-end') > 0) {

        source = String(source);

        let reg = /\/\* muti-theme-style-start \*\/([\s\S]*)\/\* muti-theme-style-end \*\//g

        let arr = source.match(reg)
        
        if(arr.length <= 0) {
            return
        }

        const originMutiThemeStr = arr[0];

        let mutiThemeStr = originMutiThemeStr;
        mutiThemeStr = mutiThemeStr.replace(/\/\* muti-theme-style-start \*\//, '');
        mutiThemeStr = mutiThemeStr.replace(/\/\* muti-theme-style-end \*\//, '');
        mutiThemeStr = mutiThemeStr.trim();
        mutiThemeStr = mutiThemeStr.replace(/(\n|\r)/g, '');

        let finStr = '\n'

        themes.forEach(item => {
            let str = mutiThemeStr;
            str = str.replace(/muti-theme-class/g, item);
            str = str.replace(/muti-theme-assets/g, item);
            finStr += str + '\n';
        })

        finStr = finStr + '/* muti-theme-style-end */'
        
        let regSource = new RegExp(originMutiThemeStr, 'g')

        source = source.replace(/\/\* muti-theme-style-end \*\//, finStr);
        
        return source;
    }
    

    return source;
}