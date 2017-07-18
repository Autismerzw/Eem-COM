/*
 * @Author: 16469
 * @Date:   2017-07-16 23:39:44
 * @Last Modified by:   16469
 * @Last Modified time: 2017-07-17 23:06:24
 */

'use strict';
require('./cart.css');
require('../common/header-nav/header-serch.js');
var cartTop = require('../common/header-nav/nav-top.js');
var _cart = require('service/cart-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var page = {
    data: {

    },
    init: function() {
        this.loadCart();
        this.bindEvent();
    },
    onLoad: function() {
        // 判断是否有数据
        this.loadCart();
    },
    bindEvent: function() {
        var _this = this;
        // 商品的选择和取消选择
        $(document).on('click', '.cart-select', function() {
                var $this = $(this);
                var productId = $this.parents('.cart-table').data('product-id');
                // 切换选中状态
                if ($this.is(':checked')) {
                    _cart.selectProduct(productId, function(res) {
                        _this.randerCart(res);
                    }, function(errMsg) {
                        $('.page-wrep').html("您的购物车空空如也！")
                    })
                } else {
                    _cart.unselectProduct(productId, function(res) {
                        _this.randerCart(res);
                    }, function(errMsg) {
                        $('.page-wrep').html("您的购物车空空如也！")
                    })
                }
            }),
            // 商品的全选和取消全选
            $(document).on('click', '.cart-select-all', function() {
                var $this = $(this);
                // 切换选中状态
                if ($this.is(':checked')) {
                    _cart.selectAllProduct(function(res) {
                        _this.randerCart(res);
                    }, function(errMsg) {
                        $('.page-wrep').html("您的购物车空空如也！")
                    })
                } else {
                    _cart.unselectAllProduct(function(res) {
                        _this.randerCart(res);
                    }, function(errMsg) {
                        $('.page-wrep').html("您的购物车空空如也！")
                    })
                }
            }),
            // 购物车内加减数量
            $(document).on('click', '.cc-op', function() {
                var $this = $(this),
                    productId = $this.parents('.cart-table').data('product-id'),
                    type = $this.hasClass('add') ? 'add' : 'less',
                    countNum = parseInt($this.siblings('.count-num').val()),
                    minCount = 1,
                    maxCount = $this.siblings('.count-num').data('max'),
                    newCount = 0;
                if (type === 'add') {
                    if (countNum >= maxCount) {
                        _mm.errorTips("该商品数量达到上线");
                        return;
                    }
                    newCount = countNum + 1;

                } else if (type === 'less') {
                    if (countNum <= minCount) {
                        return;
                    }
                    newCount = countNum - 1;
                }
                _cart.updateProduct({
                    productId: productId,
                    count: newCount
                }, function(res) {
                    _this.randerCart(res);
                }, function(errMsg) {
                    $('.page-wrep').html("您的购物车空空如也！")
                });
            }),
            // 删除单个商品
            $(document).on('click', '.cart-del', function() {
                var $this = $(this),
                    productId = $this.parents('.cart-table').data('product-id');
                    if (window.confirm("是否要删除该商品")) {
                        _this.deleteCart(productId);
                    }
            }),
            // 删除选中商品
            $(document).on('click', '.del-all', function() {
                var $this = $(this),
                   	arrProductIds = [],
                   	$selects = $('.cart-select:checked');
                   	for (let i = 0; i < $selects.length; i++) {
                   		var $selectsNum = $($selects[i]);
                   		var ProductId =  $selectsNum.parents('.cart-table').data('product-id');
                   		arrProductIds.push(ProductId);
                   		var ProductIds = arrProductIds.join(",");
                   	}
                   	console.log(ProductIds)
                    if (window.confirm("是否要删除该商品")) {
                        _this.deleteCart(ProductIds);
                    }
            }),
             // 结算提交订单
            $(document).on('click', '.cart-add', function() {
                
                // 总价大于零 ，提交订单
                if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0 ) {
                	window.location.href = './order-confirm.html';
                }else {
                	 _mm.errorTips("请选择商品再提交！！！");
                }
            })
    },
    // 加载列表详情数据
    loadCart: function() {
        var _this = this;
        _cart.getCartList(function(res) {
            _this.randerCart(res);
        }, function(errMsg) {
            $('.page-wrep').html("您的购物车空空如也！")
        })
    },
    // 渲染购物车
    randerCart: function(data) {
        this.filter(data);
        // 缓存购物车数据
        this.data.cartInfo = data;
        // 生成HTML
        var cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        // 更新顶部导航条  购物车数量更新
        cartTop.loadCartNum();
    },
    deleteCart: function(productIds) {
        var _this = this;
        _cart.deleteProduct(productIds,function(res) {
            _this.randerCart(res);
        }, function(errMsg) {
            $('.page-wrep').html("您的购物车空空如也！")
        });
    },
    filter: function(data) {
        data.notEmpty = data.cartProductVoList.length;
        console.log(this.data)
    }
}
$(function() {
    page.init();
})
