/*
* @Author: 16469
* @Date:   2017-07-19 03:32:04
* @Last Modified by:   16469
* @Last Modified time: 2017-07-19 04:41:05
*/

'use strict';
require('./payment.css');
require('../common/header-nav/nav-top.js');
require('../common/header-nav/header-serch.js');
var _mm = require('util/mm.js');
var _payMent = require('service/payment-service.js');
var templateIndex = require('./index.string');


var page = {
	data :{
		orderNumber : _mm.getUrlparam('orderNumber')
	},
	init : function(){
		this.onLoad();
	}, 
	// 事件绑定
	onLoad : function(){
		// 初始化左侧菜单
		this.loadPayment();
	},
	// 加载订单列表
	loadPayment : function(){
		var _this = this,
		paymentHtml = ''; 
		_payMent.getRQcode(this.data.orderNumber,function(res){
			// 渲染html
			paymentHtml = _mm.renderHtml(templateIndex,res);
			$('.page-wrap').html(paymentHtml);
			_this.listenOrderStatus();
		},function(errMsg){
			$('.page-wrap').html('<p class="err-tip">' + errMsg + '</p>');
		});
	},
	listenOrderStatus : function(){
		var _this= this;
		this.paymentTimer = window.setInterval(function(){
			_payMent.getPaymentStatus(_this.data.orderNumber,function(res){
				if (res === true) {
					window.location.href = './result.html?type=payment&orderNumber='+_this.data.orderNumber;
				}
			},function(errMsg){

			})
		},5e3)
	}
};
$(function(){
	page.init();
})