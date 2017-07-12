/*
* @Author: 16469
* @Date:   2017-07-11 09:05:25
* @Last Modified by:   16469
* @Last Modified time: 2017-07-11 09:24:18
*/

'use strict';
var _mm = require('util/mm.js');
var _user = {
	// 检查登陆窗台
	checkLogin: function (resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/user/get_user_inof.do'),
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
	},
};
module.exports = _user;