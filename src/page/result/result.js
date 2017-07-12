/*
* @Author: 16469
* @Date:   2017-07-11 21:10:53
* @Last Modified by:   16469
* @Last Modified time: 2017-07-12 09:34:01
*/

'use strict';
require('./result.css');
require('page/common/header-nav/header.css');
var _mm = require('util/mm.js');
$(function (){
	var type = _mm.getUrlparam('type') || 'default';
	var $element = $('.' + type + '-success');
	$element.show();
})