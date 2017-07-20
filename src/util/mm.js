/*
* @Author: 16469
* @Date:   2017-07-09 16:07:36
* @Last Modified by:   16469
* @Last Modified time: 2017-07-13 19:02:12
*/

'use strict';
var Hogan = require('hogan.js');
var conf = {
	serverHost : ''
};
var _mm = {
	test: 1234,
	// 网络请求
	request :function (parem){
		var _this = this;
		$.ajax({
			type : parem.method || 'GET',
			url: parem.url || "",
			dataType : parem.type || "json",
			data : parem.data || "",
			success : function(res){
				// 请求成功
				if (0 === res.status) {
					typeof parem.success === 'function' && parem.success(res.data,res.msg);
				} else if (10 === res.status) { 
					// 未登录，强制跳转到登陆
					_this.doLogin();
				}else if(1 === res.status){
					// 请求成功，但数据错误
					typeof parem.error === 'function' && parem.error(res.msg);
				}
			},
			// 请求失败
			error : function(err){
				typeof parem.error === 'function' && parem.error(err.statusText);
			},
		})	
	},
	// 获取后端服务器地址
	getServerUrl : function (path){
		return conf.serverHost + path;
	},
	// 获取url的参数
	getUrlparam : function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]): null
	},
	// 渲染html模板
	renderHtml : function (htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate),
		result = template.render(data);
		return result;
	},
	// 成功提示
	successTips : function (msg){
		alert(msg || '操作成功');
	},
	errorTips : function (msg){
		alert(msg || '出问题了');
	},
	// 字段验证，支持非空 手机 邮箱判断
	validate : function (value,type){
		var value = $.trim(value);
		// 非空
		if ('require'===type) {
			return !! value;
		}
		// 手机号
		if ('phone' === type) {
			return /^1\d{10}$/.test(value);
		}
		// 邮箱格式
		if ('email' === type) {
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	// 通过一登陆请求
	doLogin : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
	// 主页
	goHome : function (){
		window.location.href = './index.html'
	}
};
module.exports = _mm;