/*
* @Author: 16469
* @Date:   2017-07-13 16:57:04
* @Last Modified by:   16469
* @Last Modified time: 2017-07-15 16:18:30
*/

'use strict';
require('./user-content.css');
require('../common/header-nav/nav-top.js');
require('../common/header-nav/header-serch.js');
var navSide = require('../common/user-aside-nav/user-aside-nav.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string')

var page = {
	init : function(){
		this.onLoad()
	}, 
	// 事件绑定
	onLoad : function(){
		// 初始化左侧菜单
		navSide.init({
			name : 'user-center'
		})
		this.loadUserInfo();
	},
	// 加载用户信息
	loadUserInfo : function (){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.user-content-info').html(userHtml);
			$('.loading').hide();
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	}
};
$(function(){
	page.init();
})