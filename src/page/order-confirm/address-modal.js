/*
* @Author: 16469
* @Date:   2017-07-18 19:58:19
* @Last Modified by:   16469
* @Last Modified time: 2017-07-18 23:35:33
*/

'use strict';
var _address = require('service/address-service.js');
var _mm = require('util/mm.js');
var _citys = require('util/city/index.js');
var templateAddressModal = require('./address-modal.string');

var addressModal = {
	show : function(option){
		this.option = option;
		this.option.data = option.data || {};
		this.$modal = $('.modal');
		this.$modal.show();
		// 渲染页面
		this.loadModal();
		// 事件绑定
		this.bindEvent();
	},
	hide : function(){
		this.$modal.hide();
	},
	bindEvent : function(){
		var _this = this;
			// 二级联动
		this.$modal.find('#province').change(function() {
			var $selectProvinces = $(this).val();
			_this.loadCity($selectProvinces);
		});
		// 提交按钮
		this.$modal.find('.address-btn').click(function() {
			var receiverInfo = _this.getReceiverInfo();
			var isUpdate = _this.option.isUpdate;
			// 使用新地址且验证通过
			if (!isUpdate && receiverInfo.status) {
				_address.save(receiverInfo.data,function(res){
					_mm.successTips('地址添加成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function' 
						&& _this.option.onSuccess(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}
			// 更新收件人，并且验证通过
			else if (isUpdate && receiverInfo.status) {
				_address.addressUpdate(receiverInfo.data,function(res){
					_mm.successTips('地址修改成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function' 
						&& _this.option.onSuccess(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}else{
				_mm.errorTips(receiverInfo.errMsg || "好像出BUG了！！")
			}
		});
		// 点击关闭或者模板取余  关闭模态框
		this.$modal.find('.close').click(function() {
			_this.hide();
		});
		this.$modal.click(function() {
			_this.hide();
		});
		this.$modal.find('.address-modal').click(function(e) {
			e.stopPropagation();
		});
	},
	loadModal : function(){
		var addressModalHtml = _mm.renderHtml(templateAddressModal,{
			isUpdate : this.option.isUpdate,
			data : this.option.data
		});
		this.$modal.html(addressModalHtml);
		// 加载省份
		this.loadProvince();
	},
	// 加载省份数据
	loadProvince : function(){
		var Provinces = _citys.getProvince() || [],
			$ProvinceSelect =this.$modal.find('#province');
			$ProvinceSelect.html(this.pushSelectOption(Provinces));
			//如果更新地址  并有省份  做省份的回填
			if (this.option.isUpdate && this.option.data.receiverProvince) {
				$ProvinceSelect.val(this.option.data.receiverProvince);
				this.loadCity(this.option.data.receiverProvince);
			} 
	},
	// 刷新select的模板
	pushSelectOption : function(optionArray){
		var html = '<option value="">请选择</option>';
		for(var i = 0, length = optionArray.length; i < length; i++){
			html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>'
		};
		return html;
	},
	// 加载城市数据
	loadCity : function(city){
		var City  = _citys.getCity(city) || [],
			$citySelect =this.$modal.find('#city');
			$citySelect.html(this.pushSelectOption(City)); 
			//如果更新地址  并有城市  做城市的回填
			if (this.option.isUpdate && this.option.data.receiverCity) {
				$citySelect.val(this.option.data.receiverCity);
			} 
	},
	// 提取表单数据
	getReceiverInfo: function(){
		var receiverInfo = {};
		var result = {
			status : false
		};
		receiverInfo.receiverName 		= $.trim($('#sj-name').val());
		receiverInfo.receiverAddress	= $.trim($('#sj-address').val());
		receiverInfo.receiverProvince	= $('#province').val();
		receiverInfo.receiverCity		= $('#city').val();
		receiverInfo.receiverPhone 		= $.trim($('#sj-phone').val());
		receiverInfo.receiverZip 		= $.trim($('#sj-code').val());
		if (this.option.isUpdate) {
			receiverInfo.id 				= $.trim($('#sj-id').val());
		}
		if (!receiverInfo.receiverName) {
			result.errMsg = "请输入收件人姓名！"
		}else if (!receiverInfo.receiverProvince) {
			result.errMsg = "请选择省份！"
		}else if (!receiverInfo.receiverCity) {
			result.errMsg = "请选择城市！"
		}else if (!receiverInfo.receiverAddress) {
			result.errMsg = "请输入详细地址！"
		}else if (!receiverInfo.receiverPhone) {
			result.errMsg = "请输入手机号！"
		}else{
			// 说有验证均通过
			result.status = true;
			result.data = receiverInfo;
		}
		return result;
	}, 

};
module.exports = addressModal;