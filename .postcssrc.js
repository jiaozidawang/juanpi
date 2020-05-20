// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": { browsers: ['last 20 Chrome versions', 'Safari >= 5'] },
    "postcss-plugin-px2rem": {
      rootValue: 50,
      minPixelValue: 2,
    	selectorBlackList: [],
     	mediaQuery: true,
    	propBlackList: ['border']
    }
  }
}
