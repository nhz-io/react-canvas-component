var path = require('path');
var pkg = require('./package.json');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var
  SRC           = 'src',
  DEV           = 'dev',
  DIST          = 'dist',
  MAIN          = 'main.jsx',
  HOST          = 'localhost',
  PORT          = 9000,

  ROOT_PATH     = path.resolve(__dirname),
  SRC_PATH      = path.resolve(ROOT_PATH, SRC),
  DEV_PATH      = path.resolve(ROOT_PATH, DEV),
  DIST_PATH     = path.resolve(ROOT_PATH, DIST),
  MAIN_SRC_PATH = path.resolve(SRC_PATH, MAIN),
  MAIN_DEV_PATH = path.resolve(DEV_PATH, MAIN),

  TARGET        = process.env.npm_lifecycle_event;

if(TARGET === 'start') {
  module.exports = {
    resolve: {
      extensions: [ "", ".js", ".jsx", ".es6" ],
      alias: { src: SRC_PATH }
    },
    devtool: 'eval-source-map',
    entry: MAIN_DEV_PATH,
    output: {
      path: DIST_PATH,
      filename: pkg.name + '.js'
    },
    module: {
      loaders: [
        {
          test: /\.(es6|jsx)$/,
          loaders: ['react-hot', 'babel'],
          include: [ SRC_PATH, DEV_PATH ]
        },
        {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]'
          ],
          include: [ SRC_PATH, DEV_PATH ]
        },
        {
          test: /\.scss$/,
          loaders: [ 'style', 'css', 'sass' ],
          include: [ SRC_PATH, DEV_PATH ]
        }
      ]
    },
    devServer: {
      colors:true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      host: HOST,
      port: PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlwebpackPlugin({title: pkg.description})
    ]
  }
}

if(TARGET === 'dist') {
  module.exports = {
    resolve: {
      extensions: [ "", ".js", ".jsx", ".es6" ],
      alias: { src: SRC_PATH }
    },
    externals: (function(externals = {}) {
      for(let key in pkg.dependencies) { externals[key] = key };
      return externals;
    }()),
    entry: (function(entry = {}) {
      entry[pkg.name] = entry[pkg.name + '.min'] = MAIN_SRC_PATH;
      return entry;
    }()),
    output: {
      path: DIST_PATH,
      filename: "[name].js",
      libraryTarget: 'commonjs2',
      library: true
    },
    module: {
      loaders: [
        {
          test: /\.(es6|jsx)$/,
          loader: 'babel',
          include: SRC_PATH
        }
      ]
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        include: /\.min\.js$/,
        mangle: {
            except: ['$super', '$', 'exports', 'require']
        }
      })
    ]
  }
}
