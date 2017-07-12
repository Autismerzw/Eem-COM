/*
 * @Author: 16469
 * @Date:   2017-07-10 10:17:57
 * @Last Modified by:   16469
 * @Last Modified time: 2017-07-11 09:30:38
 */

'use strict';
require('./nav-top.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
// 导航
var nav = {
    init: function() {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartNum();
        return this;
    },
    bindEvent: function() {
        // 登陆
        $('.js-login').click(function() {
            _mm.doLogin();
        });
        // 注册
        $('.js-logup').click(function() {
            window.location.href = "./logup.html";
        });
        // 退出
        $('.js-logout').click(function() {
            _user.logout(function(res) {
                window.location.reload();
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            })
        });
    },
    // 加载用户详细
    loadUserInfo: function() {
        _user.checkLogin(function(res) {
            $('not-login').hide().siblings('.login').show().find('.user-name').text(res.username);
        }, function(errMsg) {
           // do nothing
        })
    },
    // 加载购物车数量
    loadCartNum: function() {
    	 _cart.getCartNum(function(res) {
            $('.cart-num').text( res || 0 );
        }, function(errMsg) {
           $('.cart-num').text(0);
        })
    }
};
module.exports = nav.init();
