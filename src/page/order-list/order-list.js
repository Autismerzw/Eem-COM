/*
* @Author: 16469
* @Date:   2017-07-18 03:57:29
* @Last Modified by:   16469
* @Last Modified time: 2017-07-19 01:49:04
*/

'use strict';
require('./order-list.css');
require('../common/header-nav/nav-top.js');
require('../common/header-nav/header-serch.js');
var navSide = require('../common/user-aside-nav/user-aside-nav.js');
var _order = require('service/order-service.js');
var _mm = require('util/mm.js');
var pagenation = require('util/pagenation/index.js');
var templateIndex = require('./index.string')

var page = {
	data :{
		listParam:{
			keyword		: _mm.getUrlparam('keyword') 	|| '',
			categoryId 	: _mm.getUrlparam('categoryId') || '',
			orderBy 	: _mm.getUrlparam('orderBy') 	|| 'default',
			pageNum 	: _mm.getUrlparam('pageNum') 	|| 1,
			pageSize 	: _mm.getUrlparam('pageSize') 	|| 10
		}
	},
	init : function(){
		this.onLoad()
	}, 
	// 事件绑定
	onLoad : function(){
		// 初始化左侧菜单
		navSide.init({
			name : 'order-list'
		})
		this.loadOrderList();
	},
	// 加载订单列表
	loadOrderList : function(){
		var _this = this,
		orderHtml = ''; 
		_order.getOrderList(this.data.listParam,function(res){
			_this.dataFliter(res);
			// 渲染html
			orderHtml = _mm.renderHtml(templateIndex,res);
			$('.order-list-con').html(orderHtml);
			_this.loadPagenation({
				hasPreviousPage : res.hasPreviousPage,
				prePage 		: res.prePage,
				hasNextPage 	: res.hasNextPage,
				nextPage 		: res.nextPage,
				pageNum 		: res.pageNum,
				pages 			: res.pages
			});
		},function(errMsg){
			$('.order-list-con').html('<p class="err-tip">加载收货地址失败，请稍后在试</p>');
		});
	},
	// 数据适配
	dataFliter : function (data){
		data.isEmpty = !data.list.length;
	},
	loadPagenation:function (pageInfo){
		var _this = this;
		this.pagenation ? '' :(this.pagenation = new pagenation());
		this.pagenation.render($.extend({},pageInfo,{
			container :$(".pagination"),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadOrderList();
			}
		}));
	}
};
$(function(){
	page.init();
})