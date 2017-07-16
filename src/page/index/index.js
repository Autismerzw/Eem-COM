/*
* @Author: 16469
* @Date:   2017-07-08 17:26:12
* @Last Modified by:   16469
* @Last Modified time: 2017-07-15 15:11:35
*/
'use strict';
require('./index.css');
require('../common/header-nav/nav-top.js');
require('../common/header-nav/header-serch.js');
require('../common/user-aside-nav/user-aside-nav.js');
require('util/slider/index.js');
var _mm = require('util/mm.js');
var templateBanner = require('./banner.string');
$(function() {
	var bannerHtml = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
    var $slider = $('.banner').unslider({
    	dots : true,
    });
     $('.banner-arrow').click(function() {
        var fn = $(this).hasClass('prev')? 'prev':'next';

        //  Either do unslider.data('unslider').next() or .prev() depending on the className
        $slider.data('unslider')[fn]();
    });
});