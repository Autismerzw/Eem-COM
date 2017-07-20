/*
 * @Author: 16469
 * @Date:   2017-07-17 22:56:46
 * @Last Modified by:   16469
 * @Last Modified time: 2017-07-19 00:18:28
 */

'use strict';
require('./order-confirm.css');
require('../common/header-nav/header-serch.js');
require('../common/header-nav/nav-top.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
var templateAddress = require('./address.string');
var _addressModal = require('./address-modal.js');

var order = {
    data: {
        selectAddressId: null,
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;

        // 选择地址栏的事件
        $(document).on('click', '.address-item', function() {
            var $this = $(this);
            _this.data.selectAddressId = $this.data("id");
            if ($this.hasClass('active')) {
                return;
            } else {
                $this.addClass('active').siblings('.address-item').removeClass('active');
            }
            console.log(_this.data.selectAddressId)
        });

        // 新增收货地址
        $(document).on('click', '.address-item-add', function() {
            _addressModal.show({
                isUpdate: false,
                onSuccess: function() {
                    _this.loadAddress();
                }
            });
        });
        // 编辑收件人
        $(document).on('click', '.address-update', function(e) {
        	e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function(res) {
                _addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function() {
                        _this.loadAddress();
                    }
                });
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            })
        });
        // 删除收件人
        $(document).on('click', '.address-deldate', function(e) {
        	e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            if (window.confirm("确认要删除该地址么？")) {
                _address.addressDel(shippingId, function(res) {
                    _this.loadAddress();
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                })
            }
        });
        // 订单提交
        $(document).on('click', '.cart-add', function() {
            var $this = $(this);
            var shippingId = _this.data.selectAddressId;
            if (shippingId) {
                _order.createOrder({
                    shippingId: shippingId
                }, function(res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function(errMsg) {
                    _mm.errorTips(errMsg)
                })
            }
        });

    },
    onLoad: function() {
        this.loadAddress();
        this.loadIndex();
    },
    // 加载收获地址
    loadAddress: function() {
        var _this = this;
        _address.getAddressList(function(res) {
        	_this.addressFilter(res);
            var addressHtml = _mm.renderHtml(templateAddress, res);
            $('.address-con').html(addressHtml);

        }, function(errMsg) {
            $('.address-con').html('<p class="err-tip">加载收货地址失败，请稍后在试</p>');
        })
    },
    // 处理地址列表中选中状态
    addressFilter :function(data){
    	if (this.data.selectAddressId) {
    		var selectAddressIdFlag = false;
    		for (var i = 0,length = data.list.length; i <length; i++) {
    			if (data.list[i].id === this.data.selectAddressId) {
    				data.list[i].isActive = true;
    				selectAddressIdFlag = true;
    			};
    		};
    		// 如果以前选中的地址不在列表里，将其删掉
    		if (!selectAddressIdFlag) {
    			this.data.selectAddressId = null;
    		}
    	}
    },
    loadIndex: function() {
        var _this = this;
        _order.getProductList(function(res) {
            var indexHtml = _mm.renderHtml(templateIndex, res);
            $('.product-con').html(indexHtml);
        }, function(errMsg) {
            $('.product-con').html('<p class="err-tip">商品列表加载失败，请稍后在试</p>');
        })
    }
}
$(function() {
    order.init();
})
