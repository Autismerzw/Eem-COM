/*
* @Author: 16469
* @Date:   2017-07-19 03:39:42
* @Last Modified by:   16469
* @Last Modified time: 2017-07-19 04:11:46
*/

'use strict';
var _mm = require('util/mm.js');
var _payment = {
	getRQcode: function (orderNumber,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/order/pay.do'),
		data:{
			orderNo : orderNumber
		},
		method : 'post',
		success : resolve,
		error : reject
		})
	},
	getPaymentStatus :function (orderNumber,resolve,reject){
		_mm.request({
		url:_mm.getServerUrl('/order/query_order_pay_status.do'),
		data:{
			orderNo : orderNumber
		},
		method : 'post',
		success : resolve,
		error : reject
		})
	},
}
module.exports =  _payment;