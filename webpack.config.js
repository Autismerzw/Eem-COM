/*
 * @Author: 16469
 * @Date:   2017-07-08 17:36:34
 * @Last Modified by:   16469
 * @Last Modified time: 2017-08-04 21:34:16
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量 dev/ online

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
// 获取html模板打包的参数方法
var getHtmlConfig = function(name,title) {
    return {
        template: './src/view/'+ name +'.html',
        filename: 'view/'+ name +'.html',
        favicon : './mall.ico',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}

var config = {
    // 处理多个文件
    entry: {
        'common'             : ['./src/page/common/index.js'],
        'index'              : ['./src/page/index/index.js'],
        'list'               : ['./src/page/list/list.js'],
        'detail'             : ['./src/page/detail/detail.js'],
        'cart'               : ['./src/page/cart/cart.js'],
        'order-confirm'      : ['./src/page/order-confirm/order-confirm.js'],
        'order-list'         : ['./src/page/order-list/order-list.js'],
        'order-detail'       : ['./src/page/order-detail/order-detail.js'],
        'payment'            : ['./src/page/payment/payment.js'],
        'user-login'         : ['./src/page/user-login/user-login.js'],
        'user-register'      : ['./src/page/user-register/user-register.js'],
        'user-pass-reset'    : ['./src/page/user-pass-reset/user-pass-reset.js'],
        'user-content'       : ['./src/page/user-content/user-content.js'],
        'user-content-updata': ['./src/page/user-content-updata/user-content-updata.js'],
        'user-pass-update'   : ['./src/page/user-pass-update/user-pass-update.js'],
        'result'             : ['./src/page/result/result.js'],
        'about'              : ['./src/page/about/about.js'],
    },
    // 设置多文件夹存放文件
    output: {
        path: __dirname + '/dist/',
        publicPath  :  'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
        filename: 'js/[name].js',
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
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','购物车列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认页')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('payment','订单支付页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','忘记密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-content','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-content-updata','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('about','关于我们'))
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
                loader: 'html-loader',
                query:{
                    minimize:true,
                    removeAttributeQuotes:false
                }
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