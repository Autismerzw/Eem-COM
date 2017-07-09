/*
 * @Author: 16469
 * @Date:   2017-07-08 17:36:34
 * @Last Modified by:   16469
 * @Last Modified time: 2017-07-09 08:21:21
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量 dev/ online

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
// 获取html模板打包的参数方法
var getHtmlConfig = function(name) {
    return {
        template: './src/view/'+ name +'.html',
        filename: 'view/'+ name +'.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}

var config = {
    // 处理多个文件
    entry: {
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
        'common': ['./src/page/common/index.js']
    },
    // 设置多文件夹存放文件
    output: {
        path: './dist',
        filename: 'js/[name].js',
        publicPath  : '/dist',
    },
    // 加载外部模块，或者变量
    externals: {
        'jquery': 'window.jQuery'
    },
    // 独立通用模块到js/base.js
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ],
    // 处理css
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.(gif|png|jpg)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'}
    	]
    }
}
module.exports = config;
if("dev" === WEBPACK_ENV ){
	config.entry.common.push['webpack-dev-server/client?http://localhost:8088/']
}