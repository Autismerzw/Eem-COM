/*
* @Author: 16469
* @Date:   2017-07-19 01:57:44
* @Last Modified by:   16469
* @Last Modified time: 2017-07-19 03:25:27
*/

'use strict';
require('../order-list/order-list.css');
require('./order-detail.css');
require('../common/header-nav/nav-top.js');
require('../common/header-nav/header-serch.js');
var navSide = require('../common/user-aside-nav/user-aside-nav.js');
var _order = require('service/order-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var page = {
	data :{
		orderNumber : _mm.getUrlparam('orderNumber')
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	}, 
	// 事件绑定
	onLoad : function(){
		// 初始化左侧菜单
		navSide.init({
			name : 'order-list'
		})
		this.loadOrderDetail();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.order-cancel',function(){
			_order.delOrder(_this.data.orderNumber,function(res){
				if (window.confirm("是否要取消订单")) {
					_mm.successTips('该订单取消成功');
                    _this.loadOrderDetail();
				}
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		})
	},
	// 加载订单列表
	loadOrderDetail : function(){
		var _this = this,
		orderDetailHtml = ''; 
		_order.getOrderDetail(this.data.orderNumber,function(res){
			_this.dataFilter(res);
			// 渲染html
			orderDetailHtml = _mm.renderHtml(templateIndex,res);
			$('.user-content-main').html(orderDetailHtml);
		},function(errMsg){
			$('.user-content-main').html('<p class="err-tip">' + errMsg + '</p>');
		});
	},
	dataFilter : function(data){
        data.needPay        = data.status == 10;
        data.isCancelable   = data.status == 10;
    }
};
$(function(){
	page.init();
})