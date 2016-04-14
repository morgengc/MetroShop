'use strict';

/* App Module */

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

    $routeProvider.otherwise({
      redirectTo: '/page/1'
    });
  }]);

