/*
 * @Author: 16469
 * @Date:   2017-07-08 17:36:34
 * @Last Modified by:   16469
 * @Last Modified time: 2017-07-11 21:20:49
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量 dev/ online

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
// 获取html模板打包的参数方法
var getHtmlConfig = function(name,title) {
    return {
        template: './src/view/'+ name +'.html',
        filename: 'view/'+ name +'.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}

var config = {
    // 处理多个文件
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
        'result': ['./src/page/result/result.js']
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
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))
    ],
    // 处理css
    module: {
        loaders: [
            { 
            	test: /\.css$/, 
            	loader: ExtractTextPlugin.extract("style-loader","css-loader") 
            },
            { 
            	test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
            	loader: 'url-loader?limit=100&name=resource/[name].[ext]'
            },
            {
                test: /\.string$/, 
                loader: 'html-loader'
            }
    	]
    },
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
}
if("dev" === WEBPACK_ENV ){
	config.entry.common.push["WEBPACK_ENV=dev webpack-dev-server --inline --port 8088"]
}
module.exports = config;