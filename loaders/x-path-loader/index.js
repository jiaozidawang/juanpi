/* eslint no-param-reassign: 0 */
const loaderUtils = require('loader-utils');
const config = require('../../config/index');
module.exports = function (source) {

    const ENV = process.env.NODE_ENV === 'production' ? 'build' : 'dev';
    const options = loaderUtils.getOptions(this) || {};
    
    const rules = options.rules || config[ENV].xpath;
    
    for (const key in rules) {
        const it = rules[key];
        if (it && it.from && it.to) {
            const reg = new RegExp(it.from, 'g');
            source = source.replace(reg, it.to);
        }
    }
    return source;
};