/*
* @Author: 16469
* @Date:   2017-07-11 09:27:21
* @Last Modified by:   16469
* @Last Modified time: 2017-07-13 10:42:35
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
	}
};
module.exports = _cart;