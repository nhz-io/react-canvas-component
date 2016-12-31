const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    xo: require('./package.json').xo,
    devtool: 'eval-source-map',
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src'),
        },
    },
    entry: [
        `webpack-dev-server/client?http://localhost:9000`,
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, 'dev/index.js'),
    ],
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'xo-loader',
                exclude: /node_modules/,
            },
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'react-hot',
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [
                        'react',
                    ],
                    plugins: [
                        'transform-inline-imports-commonjs',
                        'transform-class-properties',
                        'transform-object-rest-spread',
                    ],
                },
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/,
                loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
        }),
    ],
    devServer: {
        colors: true,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        host: 'localhost',
        port: 9000,
    },
}
