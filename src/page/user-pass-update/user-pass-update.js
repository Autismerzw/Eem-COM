/*
* @Author: 16469
* @Date:   2017-07-13 22:41:57
* @Last Modified by:   16469
* @Last Modified time: 2017-07-13 23:44:15
*/

'use strict';
require('../common/header-nav/nav-top.js');
require('../common/header-nav/header-serch.js');
require('../user-content/user-content.css');
var navSide = require('../common/user-aside-nav/user-aside-nav.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	}, 
	// 事件绑定
	onLoad : function(){
		// 初始化左侧菜单
		navSide.init({
			name : 'user-pass-update'
		})
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.btn-submit',function (){
			var userInfo = {
				password : $.trim($('#password').val()),
				passwordNew : $.trim($('#password-new').val()),
				passwordConfirm : $.trim($('#password-confirm').val())
			};
			var validataResult = _this.validateForm(userInfo);
			if (validataResult.status) {
				// 更改密码
				_user.resetPassword({
					passwordOld : userInfo.password,
					passwordNew : userInfo.passwordNew
				},function(res){
					_mm.successTips('修改成功');
					window.location.href = './result.html?type=pass-reset';
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
        // 验证密码是否为空
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            return result;
        };
        // 验证邮箱
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '密码不得小于6位';
            return result;
        };
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入密码不一致';
            return result;
        };
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
	}
};
$(function(){
	page.init();
})