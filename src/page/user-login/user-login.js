/*
* @Author: 16469
* @Date:   2017-07-12 10:13:15
* @Last Modified by:   16469
* @Last Modified time: 2017-07-12 23:39:26
*/

'use strict';
require('./user-login.css');
require('page/common/header-nav/header.css');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

//表单验证错误提示 
var formError = {
	show : function (errMsg){
		$(".err-msg").show().find(".error-text").text(errMsg);
	},
	hide : function (){
		$(".err-msg").hide().find(".error-text").text("");
	}
};

var page = {
	init : function(){
		this.bindEvent()
	}, 
	// 事件绑定
	bindEvent : function(){
		var _this = this;
		// 登陆按钮的点击事件绑定
		$('#submit').click(function() {
			_this.submit();
		});
		// 键盘回车按钮的事件绑定
		$('.user-con').keyup(function(e) {
			if(e.keyCode === 13 ){
				_this.submit();
			}
		});
	},
	// 提交按钮点事件
	submit : function(){
        var formData = {
                username : $.trim($('#user-name').val()),
                password : $.trim($('#user-password').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        // 验证成功
        if(validateResult.status){
            _user.login(formData, function(res){
                window.location.href = _mm.getUrlparam('redirect') || './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 验证失败
        else{
            // 错误提示
            formError.show(validateResult.msg);
        }

    },
    // 表单字段的验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
$(function(){
	page.init();
})