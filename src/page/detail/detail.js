/*
* @Author: 16469
* @Date:   2017-07-16 18:19:38
* @Last Modified by:   16469
* @Last Modified time: 2017-07-16 22:21:18
*/

'use strict';
require('./detail.css');
require('../common/header-nav/nav-top.js');
require('../common/header-nav/header-serch.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var page = {
	data:{
		productId :_mm.getUrlparam('productId') || ''
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		// 判断是否有数据
		if (!this.data.productId) {
			_mm.goHome();
		}
		this.loadDetail();
	},
	bindEvent : function(){
		var _this = this;
		// 图片预览
		$(document).on('mouseenter','.p-img-item',function(){
			var imgUrl = $(this).find('.p-img').attr('src');
			var mainImgUrl = $('.main-img').attr('src',imgUrl);
		})
		// 购买数量的加减
		$(document).on('click','.count-btn',function(){
			// var type = $(this).hasClass('add') ? 'add' : 'less';
			// var $countNum = $('.p-count'),
			 	// currCount = parseInt($countNum.text()),
				// minCount = 1,
				// maxCount = _this.data.detailInfo.stock || 1;
				// if (type === 'add') {
				// 	$countNum.text(currCount < maxCount ? + 1 : maxCount);
				// }else if (type === 'less'){
				// 	$countNum.text(currCount > minCount ? - 1 : minCount);
				// }

			// 自己以前的方法
			var $countNum = $('.p-count').text()-0,
				minCount = 1,
				maxCount = _this.data.detailInfo.stock || 1;
			if ($(this).hasClass('add')) {
				if ($countNum < maxCount) {
					$('.p-count').text($countNum +=1 )
				}else{
					$('.p-count').text(maxCount)
				}
			}else{
				if ($countNum > minCount) {
					$('.p-count').text($countNum -=1 )
				}else{
					$('.p-count').text(1)
				}
			}
		})
		// 加入购物车
		$(document).on('click','.cart-add',function(){
			_cart.addToCart({
				productId : _this.data.productId,
				count : $('.p-count').text()-0,
			},function(res){
				window.location.href = './result.html?type=cart-add';
			},function(errMsg){
				_mm.errorTips(errMsg);
			})
		})
	},
	// 加载列表详情数据
	loadDetail : function(){
		var _this = this;
		var html = "";
		var $pageWrap = $('.page-wrap');
		_product.getProductDetail(this.data.productId,function(res){
			_this.filter(res);
			// 缓存detail数据
			_this.data.detailInfo = res;
			// 渲染html
			html = _mm.renderHtml(templateIndex,res);
			$pageWrap.html(html);
		},function(errMsg){
			$pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
		});
	},
	// 缩略图数据拆分
	filter : function(data){
		data.subImages = data.subImages.split(',')
	}
}
$(function(){
	page.init();
})
