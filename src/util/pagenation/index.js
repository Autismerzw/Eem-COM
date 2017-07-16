/*
* @Author: 16469
* @Date:   2017-07-16 09:06:46
* @Last Modified by:   16469
* @Last Modified time: 2017-07-16 17:24:01
*/

'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var temlatePagenation = require('./index.string');
var pagenation = function(){
	var _this = this;
	this.defaultOption = {
		container : null,
		pageNum : 1,
		pageRange :3,
		onSelectPage : null
	};
	// 事件处理
	$(document).on("click",".pg-item",function(){
		var $this = $(this);
		if ($this.hasClass('active')||$this.hasClass('disabled')) {
			console.log("无法点击")
			return;
		}
		typeof _this.option.onSelectPage === "function" ?  _this.option.onSelectPage($this.data('value')) : null;
	})
};
// 渲染分也足见
pagenation.prototype.render = function(userOption){
	// 合并选项
	this.option = $.extend({}, this.defaultOption, userOption);
	// 判断容器是否合法
	if (!(this.option.container instanceof jQuery)) {
		return;
	};
	// 判断是否只有一页
	if(this.option.pages<=1){
		return;
	};
	// 渲染分页内容
	this.option.container.html(this.getPagenationHtml());

};
// 获取分页的html |上一页| 1 2 3 4 5 6 |下一页| 5/6
pagenation.prototype.getPagenationHtml = function(){
	// 
	var html = "";
	var  pageArray = [];
	var option = this.option;
	var start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1;
	var end = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;
	// 上一页按钮数据
	pageArray.push({
		name:'上一页',
		value : this.option.prePage,
		disabled : !this.option.hasPreviousPage
	});
	// 数字按钮的处理
	for (var i = start; i<=end;i++) {
		pageArray.push({
		name: i,
		value : i,
		active :(i===option.pageNum)
		});
	};
	pageArray.push({
		name:'下一页',
		value : this.option.nextPage,
		disabled : !this.option.hasNextPage
	});
	html = _mm.renderHtml(temlatePagenation,{
		pageArray 	: pageArray,
		pageNum 	: option.pageNum,
		pages     	:option.pages
	});
	return html; 
};
module.exports = pagenation;