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
    $routeProvider.when('/page/:pid', {
      templateUrl: 'partials/shop-list.html',
      controller: 'ShopListCtrl'
    });

    $routeProvider.when('/:Longitude,:Latitude', {
      templateUrl: 'partials/shop-map.html',
      controller: 'ShopMapCtrl'
    });

    $routeProvider.when('/about', {
      templateUrl: 'partials/about.html',
      controller: 'AboutCtrl'
    });

    $routeProvider.when('/contact', {
      templateUrl: 'partials/contact.html',
      controller: 'ContactCtrl'
    });

    $routeProvider.otherwise({
      redirectTo: '/page/1'
    });
  }]);

