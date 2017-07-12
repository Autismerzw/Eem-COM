/*
* @Author: 16469
* @Date:   2017-07-11 09:58:09
* @Last Modified by:   16469
* @Last Modified time: 2017-07-11 17:10:50
*/

'use strict';
require('./header-serch.css');
var _mm = require('util/mm.js');
var serch = {
    init: function() {
        this.bindEvent();
    },
    onLoad:function(){
    	var keyWord = _mm.getUrlparam('keyword');
    	if (keyWord){
    		$('#serch-input').val(keyWord);
    	};
    },
    bindEvent: function() {
    	var _this = this;
    	$('.serch-btn').click(function(){
    		_this.serchSubmit();
    	});
    	$('#serch-input').keyup(function(e){
    		if (e.keyCode === 13) {
    			_this.serchSubmit();
    		}
    	});
    },
    // 搜索的提交
    serchSubmit : function (){
    	var keyWord = $.trim($('#serch-input').val());
    	// 提交的时候 keyword有值，则跳转到list的页面；否则不跳转或者跳转到主页
    	if (keyWord) {
    		window.location.href = './list.html?keyword='+keyWord;
    	} else {
    		_mm.goHome();
    	}
    }
};
serch.init();
