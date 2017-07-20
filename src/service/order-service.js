/*
* @Author: 16469
* @Date:   2017-07-18 01:09:50
* @Last Modified by:   16469
* @Last Modified time: 2017-07-19 03:23:13
*/

'use strict';
var _mm = require('util/mm.js');
var _order = {
	getProductList :function (resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/order/get_order_cart_product.do'),
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	createOrder:function (orderInfo,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/order/create.do'),
		data: orderInfo,
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	getOrderList :function (listParam,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/order/list.do'),
		data:listParam,
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	getOrderDetail : function (orderNumber,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/order/detail.do'),
		data:{
			orderNo : orderNumber
		},
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	delOrder : function (orderNumber,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/order/cancel.do'),
		data:{
			orderNo : orderNumber
		},
		method : 'post',
		success : resolve,
		error : reject
		})
	}
}
module.exports = _order;
