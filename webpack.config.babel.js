var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);

if(TARGET === 'start') {
  module.exports = {
    resolve: {
      extensions: [ "", ".js", ".jsx", ".es6" ],
      alias: { src: path.resolve(ROOT_PATH, 'src/') }
    },
    devtool: 'eval-source-map',
    entry: path.resolve(ROOT_PATH, 'dev/main.jsx'),
    output: {
      path: path.resolve(ROOT_PATH, 'dist'),
      filename: 'script.js'
    },
    module: {
      loaders: [
        {
          test: /\.(es6|jsx)$/,
          loaders: ['react-hot', 'babel'],
          include: ROOT_PATH
        },
        {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]'
          ]
        },
        {
          test: /\.scss$/,
          loaders: [ 'style', 'css', 'sass' ]
        }
      ]
    },
    devServer: {
      colors:true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      port:9000
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlwebpackPlugin({
        title: 'React Canvas Component'
      })
    ]
  }
}

if(TARGET === 'dist') {
  module.exports = {
    resolve: {
      extensions: [ "", ".js", ".jsx", ".es6", ".coffee" ],
      alias: { src: path.resolve(ROOT_PATH, 'src/') }
    },
    externals: {
      "react": "react",
      "alt": "alt"
    },
    entry: {
      app: path.resolve(ROOT_PATH, 'src/main.jsx')
    },
    output: {
      path: path.resolve(ROOT_PATH, 'dist'),
      filename: 'script.js'
    },
    module: {
      loaders: [
        {
          test: /\.(es6|jsx)$/,
          loaders: ['react-hot', 'babel'],
          include: ROOT_PATH
        },
        {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]'
          ]
        },
        {
          test: /\.scss$/,
          loaders: [ 'style', 'css', 'sass' ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        mangle: {
            except: ['$super', '$', 'exports', 'require']
        }
      })
    ]
  }
}
