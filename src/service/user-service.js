/*
* @Author: 16469
* @Date:   2017-07-11 09:05:25
* @Last Modified by:   16469
* @Last Modified time: 2017-07-21 02:46:01
*/

'use strict';
var _mm = require('util/mm.js');
var _user = {
	// 用户登录
	login: function (userInfo,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/user/login.do'),
		data: userInfo,
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	// 异步检查用户名是否存在
	checkUsername: function (username,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/user/check_valid.do'),
		data: {
			type : 'username',
			str : username
		},
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	// 用户注册
	register: function (userInfo,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/user/register.do'),
		data: userInfo,
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	// 检查登陆窗台
	checkLogin: function (resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/user/get_user_info.do'),
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	getQuestion: function (username,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/user/forget_get_question.do'),
		data: {
			username:username
		},
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	checkAnswer : function (userInfo,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/user/forget_check_answer.do'),
		data: userInfo,
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	passwordReset : function (userInfo,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/user/forget_reset_password.do'),
		data: userInfo,
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	getUserInfo : function (resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/user/get_information.do'),
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	upDataUserInfo : function (userInfo,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/user/update_information.do'),
		data: userInfo,
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	resetPassword : function (userInfo,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/user/reset_password.do'),
		data: userInfo,
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	// 推出
	logout: function (resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/user/logout.do'),
		method : 'post',
		success : resolve,
		error : reject
		})
	}
};
module.exports = _user;