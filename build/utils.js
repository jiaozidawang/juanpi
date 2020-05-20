
var path = require('path');
const config = require('../config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const resolve = dir => path.join(__dirname, '..', dir);

exports.assetsPath = function(_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
  config.build.assetsSubDirectory :
  config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function(options) {
  options = options || {};

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap,
    },
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader];
    loaders.push({ loader: 'postcss-loader'})

    loaders.push({
      loader: 'x-path-loader',
      options: {
          rules: options.rules
      }
    })

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      });
    }


    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
      });
    } else {
      return ['vue-style-loader'].concat(loaders);
    }
  }

  function resolveResouce(name) {
    return path.resolve(__dirname, '../core/public/less/' + name);
  }


  // 生成sass-loader配置
  function generateSassResourceLoader() {
    var loaders = [
      cssLoader,
      'postcss-loader',
      'less-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [resolveResouce('vars.less')]
        }
      }
    ];
    
    loaders.push({
      loader: 'x-path-loader',
      options: {
          rules: options.rules
      }
    })

    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  const stylusOptions = {
    "resolve url": true
  };
  
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less").concat({
      loader: "sass-resources-loader",
      options: {
        resources: [resolveResouce("vars.less")]
      },
    }),
    sass: generateSassResourceLoader(),
    stylus: generateLoaders("stylus", stylusOptions),
    styl: generateLoaders("stylus", stylusOptions),
  };
};


// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  var output = [];
  var loaders = exports.cssLoaders(options);
  for (var extension in loaders) {
    var loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader,
    });
  }
  return output;
};

exports.resolve = resolve;

exports.getIPAdress = () => {
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