/*
* @Author: 16469
* @Date:   2017-07-11 09:27:21
* @Last Modified by:   16469
* @Last Modified time: 2017-07-17 18:26:58
*/

'use strict';
var _mm = require('util/mm.js');
var _cart = {
	// 检查登陆状态
	getCartNum: function (resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/cart/get_cart_product_count.do'),
		success : resolve,
		error : reject
		})
	},
	addToCart :  function (productInfo,resolve,reject){
		_mm.request({
		url: _mm.getServerUrl('/cart/add.do'),
		data: productInfo ,
		success : resolve,
		error : reject
		})
	},
	getCartList :function (resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/cart/list.do'),
		success : resolve,
		error : reject
		})
	},
	selectProduct :  function (productId,resolve,reject){
		_mm.request({
		url: _mm.getServerUrl('/cart/select.do'),
		data: {
			productId :productId 
		},
		success : resolve,
		error : reject
		})
	},
	unselectProduct :  function (productId,resolve,reject){
		_mm.request({
		url: _mm.getServerUrl('/cart/un_select.do'),
		data: {
			productId :productId 
		},
		success : resolve,
		error : reject
		})
	},
	selectAllProduct :function (resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/cart/select_all.do'),
		success : resolve,
		error : reject
		})
	},
	unselectAllProduct :function (resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/cart/un_select_all.do'),
		success : resolve,
		error : reject
		})
	},
	updateProduct : function(cartInfo,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/cart/update.do'),
		data : cartInfo,
		success : resolve,
		error : reject
		})
	},
	deleteProduct : function(productIds,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/cart/delete_product.do'),
		data : {
			productIds: productIds
		},
		success : resolve,
		error : reject
		})
	},
};
module.exports = _cart;