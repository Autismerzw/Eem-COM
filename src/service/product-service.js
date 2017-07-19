/*
* @Author: 16469
* @Date:   2017-07-15 15:49:20
* @Last Modified by:   16469
* @Last Modified time: 2017-07-19 23:22:10
*/

'use strict';
var _mm = require('util/mm.js');
var _product = {
	// 获取商品列表
	getProductList : function (listParam,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/product/list.do'),
		data: listParam,
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	getProductDetail :function (productId,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/product/detail.do'),
		data: {
			productId : productId
		},
		method : 'post',
		success : resolve,
		error : reject
		})
	},
}
module.exports = _product;
