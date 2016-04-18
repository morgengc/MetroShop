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
  'shopcatControllers',
  'baiduMap'
]);

shopcatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/page/:pid', {
      templateUrl: 'partials/shop-list.html',
      controller: 'ShopListCtrl'
    });

    $routeProvider.when('/:Longitude,:Latitude', {
      templateUrl: 'partials/shop-detail.html',
      controller: 'ShopDetailCtrl'
    });

    $routeProvider.when('/about', {
      templateUrl: 'partials/about.html'
    });

    $routeProvider.when('/contact', {
      templateUrl: 'partials/contact.html'
    });

    $routeProvider.otherwise({
      redirectTo: '/page/1'
    });
  }]);

