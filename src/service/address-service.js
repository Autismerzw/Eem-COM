/*
* @Author: 16469
* @Date:   2017-07-18 02:46:42
* @Last Modified by:   16469
* @Last Modified time: 2017-07-18 23:48:13
*/

'use strict';
var _mm = require('util/mm.js');
var _address = {
	// 获取商品列表
	getAddressList : function (resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/shipping/list.do'),
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	// 提交新的收件人
	save : function (addressInfo,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/shipping/add.do'),
		data : addressInfo,
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	// 编辑收件人
	getAddress :  function (shippingId,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/shipping/select.do'),
		data:{
			shippingId :shippingId
		},
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	// 提交修改信息
	addressUpdate : function (addressInfo,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/shipping/update.do'),
		data : addressInfo,
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	// 删除收件人
	addressDel : function (shippingId,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/shipping/del.do'),
		data:{
			shippingId :shippingId
		},
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	// getProductDetail :function (productId,resolve,reject){
	// 	_mm.request({
	// 	url:_mm.getServerUrl('/product/detail.do'),
	// 	data: {
	// 		productId : productId
	// 	},
	// 	method : 'post',
	// 	success : resolve,
	// 	error : reject
	// 	})
	// },
}
module.exports = _address;
