/*
* @Author: 16469
* @Date:   2017-07-12 16:38:48
* @Last Modified by:   16469
* @Last Modified time: 2017-07-13 00:06:47
*/

'use strict';
'use strict';
require('./user-register.css');
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
		// 验证username
		$("#user-name").blur(function() {
			var userName = $.trim($('#user-name').val());
			if (!userName) {
				// statement
				return;
			};
			// 异步验证用户名是否存在
			_user.checkUsername(userName,function(res){
				formError.hide();
			},function(errMsg){
				formError.show(errMsg);
			});
		});
		// 注册按钮的点击事件绑定
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
                password : $.trim($('#user-password').val()),
                passwordConfirm : $.trim($('#user-password-confirm').val()),
                phone : $.trim($('#user-phone').val()),
                email : $.trim($('#user-email').val()),
                question : $.trim($('#user-question').val()),
                answer : $.trim($('#user-answer').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        // 验证成功
        if(validateResult.status){
            _user.register(formData, function(res){
               	window.location.href = './result.html?type=register';
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
        // 验证用户名是否为空
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        };
         // 验证密码是否为空
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        };
         // 验证密码长度
        if(formData.password.length < 6){
            result.msg = '密码长度不能小于6位';
            return result;
        };
        // 验证两次输入密码是否一致
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入密码不一致';
            return result;
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
    }
};
$(function(){
	page.init();
})