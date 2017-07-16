/*
* @Author: 16469
* @Date:   2017-07-15 15:39:55
* @Last Modified by:   16469
* @Last Modified time: 2017-07-16 17:31:05
*/

'use strict';
require('./list.css');
require('../common/header-nav/nav-top.js');
require('../common/header-nav/header-serch.js');
var _product = require('service/product-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var pagenation = require('util/pagenation/index.js')
var page = {

	data :{
		listParam:{
			keyword		: _mm.getUrlparam('keyword') 	|| '',
			categoryId 	: _mm.getUrlparam('categoryId') || '',
			orderBy 	: _mm.getUrlparam('orderBy') 	|| 'default',
			pageNum 	: _mm.getUrlparam('pageNum') 	|| 1,
			pageSize 	: _mm.getUrlparam('pageSize') 	|| 20
		}
	},
	// 初始化
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function (){
		this.loadList();
	},
	bindEvent : function (){
		var _this = this;
		// 排序点击时间
		$('.sort-item').click(function() {
			var $this = $(this);
			_this.data.listParam.pageNum = 1;
			if ($this.data('type')==="default") {
			// 如果 已经是默认样式且处于选中状态，则不做任何动作
				if ($this.hasClass('active')){
					return;
				}else{
					// 点击选中默认排序按钮
					$this.addClass('active').siblings('.sort-item').removeClass("active asc desc");
					_this.data.listParam.orderBy = "default";
				};
			}else if ($this.data('type')==="price") {
				// 点击按价格排序按钮，
				$this.addClass('active').siblings('.sort-item').removeClass("active asc desc");
				// 判断是升序还是降序
				if (!$this.hasClass('asc')) {
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = "price_asc";
				}else{
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = "price_desc";
				}
			}
			// 重新渲染list
			_this.loadList();
		});
	},
	// 加载list数据并渲染html
	loadList : function(){
		var listParam = this.data.listParam;
		var listHtml = "";
		var _this = this;
		// listParam.keyword ? (delete listParam.keyword) : (delete listParam.categoryId);
		_product.getProductList(listParam,function(res){
			listHtml = _mm.renderHtml(templateIndex,{
				list : res.list 
			});
			$('.p-list-con').html(listHtml);
			_this.loadPagenation({
				hasPreviousPage : res.hasPreviousPage,
				prePage 		: res.prePage,
				hasNextPage 	: res.hasNextPage,
				nextPage 		: res.nextPage,
				pageNum 		: res.pageNum,
				pages 			: res.pages
			});
		},function(errMsg){
			_mm.errorTips(errMsg);
		})
	},
	// 加载分页信息
	loadPagenation:function (pageInfo){
		var _this = this;
		this.pagenation ? '' :(this.pagenation = new pagenation());
		this.pagenation.render($.extend({},pageInfo,{
			container :$(".pagination"),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadList();
			}
		}));
	}
};


$(function(){
	page.init();
})

