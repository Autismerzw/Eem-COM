/*
* @Author: 16469
* @Date:   2017-07-13 16:59:04
* @Last Modified by:   16469
* @Last Modified time: 2017-07-13 22:37:37
*/

'use strict';
require('../common/header-nav/nav-top.js');
require('../common/header-nav/header-serch.js');
require('../user-content/user-content.css');
var navSide = require('../common/user-aside-nav/user-aside-nav.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string')

var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	}, 
	// 事件绑定
	onLoad : function(){
		// 初始化左侧菜单
		navSide.init({
			name : 'user-center'
		})
		this.loadUserInfo();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.btn-submit',function (){
			var userInfo = {
				phone : $.trim($('#phone').val()),
				email : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer : $.trim($('#answer').val())
			};
			var validataResult = _this.validateForm(userInfo);
			if (validataResult.status) {
				// statement
				_user.upDataUserInfo(userInfo,function(res){
					_mm.successTips('编辑成功');
					window.location.href = './result.html?type=default';
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			} else {
				// statement
				_mm.errorTips(validataResult.msg);
			}
		});
	},
	validateForm : function(formData){
		var result = {
            status  : false,
            msg     : ''
        };
        // 验证手机
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '请输入正确手机号';
            return result;
        };
        // 验证邮箱
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '请输入正确邮箱';
            return result;
        };
        // 验证问题和答案是否为空
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        };
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        };
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
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