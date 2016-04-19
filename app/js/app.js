'use strict';

/**
 * 路由控制模块
 *
 * @module shopcatApp
 * @submodule shopcatControllers
 * @main shopcatApp
 */
var shopcatApp = angular.module('shopcatApp', [
  'ngRoute',
  'ngAnimate',
  'shopcatControllers',
  'baiduMap'
]);

/**
 * 路由控制规则
 *
 * @method
 * @param {Object} $routeProvider 路由
 * @return undefined
 */
shopcatApp.config(['$routeProvider',
  function($routeProvider) {
    // 店铺分页显示
    $routeProvider.when('/page/:pid', {
      templateUrl: 'partials/shop-list.html',
      controller: 'ShopListCtrl'
    });

    // 店铺地图
    $routeProvider.when('/:Longitude,:Latitude', {
      templateUrl: 'partials/shop-map.html',
      controller: 'ShopMapCtrl'
    });

    // 按区域分页显示
    $routeProvider.when('/district/:did/:pid', {
      templateUrl: 'partials/shop-list.html',
      controller: 'ShopDistrictCtrl'
    });

    // 关于
    $routeProvider.when('/about', {
      templateUrl: 'partials/about.html',
      controller: 'AboutCtrl'
    });

    // 联系
    $routeProvider.when('/contact', {
      templateUrl: 'partials/contact.html',
      controller: 'ContactCtrl'
    });

    // 默认
    $routeProvider.otherwise({
      redirectTo: '/page/1'
    });
  }]);

