/*
* @Author: 16469
* @Date:   2017-07-12 17:33:17
* @Last Modified by:   16469
* @Last Modified time: 2017-07-13 10:21:43
*/

'use strict';
require('./user-pass-reset.css');
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
	data:{
		username:'',
		question:'',
		answer  :'',
		token   :'',
	},
	init : function(){
		this.onLoad();
		this.bindEvent()
	}, 
	onLoad : function(){
		this.loadStepUsername();
	},
	// 事件绑定
	bindEvent : function(){
		var _this = this;
		// 用户名下一步的点击按钮事件
		$('#submit-username').click(function() {
			var username = $.trim($('#username').val());
			if(username){
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();

				},function(errMsg){
					formError.show("请输入用户名");
				})
			}
		});
		// 密码提示问题答案下一步的点击按钮事件
		$('#submit-answer').click(function() {
			var  answer = $.trim($('#user-answer').val());
			// 检查
			if(answer){
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer   : answer
				},function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();

				},function(errMsg){
					formError.show("请输入答案");
				})
			}
		});
		// 新密码的下一步点击事件
		$('#submit-password').click(function() {
			var  password = $.trim($('#user-password').val());
			// 检查
			if(password && password.length >= 6){
				_user.passwordReset({
					username : _this.data.username,
					passwordNew : password,
					forgetToken : _this.data.token

				},function(res){
               	window.location.href = './result.html?type=pass-reset';

				},function(errMsg){
					formError.show("请输入不少于6位新密码");
				})
			}
		});
	},

	loadStepUsername : function (){
		$('.step-username').show();
	},
	loadStepQuestion : function (){
		formError.hide();
		$('.step-username').hide();
		$('.step-question').show();
		$('.reset-text').show().find('.question-text').text(this.data.question);
	},
	loadStepPassword : function (){
		formError.hide();
		$('.step-question').hide();
		$('.step-password').show();
	},

};
$(function(){
	page.init();
})