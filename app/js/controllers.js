'use strict';

/* Controllers */

var shopcatControllers = angular.module('shopcatControllers', []);

/**
 * shop-list.html页面使用的控制器，用于分页控制
 * 需要使用如下服务：
 * $rootScope   用于所有控制器之间共享数据
 * $scope       HTML与控制器之间绑定数据
 * $location    分析浏览器地址栏中的URL
 */
shopcatControllers.controller('shopIndexController', ['$rootScope', '$scope', '$location',
	function($rootScope, $scope, $location) {
		$rootScope.pageSize = 5;	// 每页显示的纪录数

		var prefix = "/page/";

		/**
		 * 定位到前面一个分页
		 * @param 无
		 * @returns void
		 */
		$scope.previous = function () {
			// 从浏览器的地址栏获取路径，即"app/#/page/1"中井号后面的内容："/page/1"
			// 然后通过JavaScript的slice函数取出斜杠后面的字符，并转换成数字。
			// 加 1 还是减 1 要看是在定义的是哪个按钮的功能函数了
			var pageNum = parseInt($location.path().slice(prefix.length)) - 1;
			if (pageNum < 1) {
				alert('This is the first page');
			} else {
				// 如果现在没有处在第一页，则path属性减去1，即向前翻一页。这个翻页的效果就是通过设置url中的path来实现
				$location.path(prefix+pageNum);
			}
		};

		/**
		 * 定位到后面一个分页
		 * @param 无
		 * @returns void
		 */
		$scope.next = function () {
			var pageNum = parseInt($location.path().slice(prefix.length)) + 1;
			if (pageNum > $rootScope.allPage) {
				alert('This is the last page');
			} else {
				$location.path(prefix+pageNum);
			}
		};

		/**
		 * 直接跳转到指定页码
		 * @param 无
		 * @returns void
		 */
		$scope.goToPage = function () {
			// 从input输入框绑定的currentPage变量中获取用户输入的值
			var pageNum = $scope.currentPage;
			// 为了程序的严密和可用性，需要先判断输入是否为空
			if (pageNum == null || pageNum == undefined || pageNum == "") {
				alert("try to input a page number");
			} else if (!(pageNum >= 1 && pageNum <= $rootScope.allPage)) {
				alert("The page number is beyond the scope of the number of the students")
			} else {
				$location.path(prefix+pageNum);
			}
		};
	}
]);

/**
 * shop-list.html页面使用的控制器，用于显示每个分页
 * 需要使用如下服务：
 * $rootScope   用于所有控制器之间共享数据
 * $scope       HTML与控制器之间绑定数据
 * $http        获取JSON数据
 * $routeParams URL的路由规则获取
 */
shopcatControllers.controller('ShopListCtrl', ['$rootScope', '$scope', '$http', '$routeParams',
	function($rootScope, $scope, $http, $routeParams) {
		$http.get('data/MetroShops.json').success(function(data) {
			// 注意：json数组的索引是从1开始，而返回的数据是个数组，下标从0开始
			var start = ($routeParams.pid-1)*$rootScope.pageSize;
			var end = start + $rootScope.pageSize;
			$scope.shops = data.slice(start, end);

			/* 总页面数 */
			$rootScope.allPage = (parseInt(data.length)%$rootScope.pageSize == 0) ?
				(parseInt(data.length/$rootScope.pageSize)) :
				(parseInt(data.length/$rootScope.pageSize) + 1);
		});
	}
]);

/**
 * shop-detail.html页面使用的控制器，用于显示每个店铺的地图
 * 需要使用如下服务：
 * $scope       HTML与控制器之间绑定数据
 * $routeParams URL的路由规则获取
 */
shopcatControllers.controller('ShopDetailCtrl', ['$scope', '$routeParams',
	function($scope, $routeParams) {
		$scope.latitude = $routeParams.Latitude;
		$scope.longitude = $routeParams.Longitude;

		$scope.mapOptions = {
			center: {
				longitude: $scope.longitude,
				latitude: $scope.latitude
			},
			zoom: 17,
			city: 'ChongQing',
			markers: [{
				longitude: $scope.longitude,
				latitude: $scope.latitude,
				//icon: 'img/mappiont.png',
				//width: 49,
				//height: 60,
				title: 'Where',
				content: 'Put description here'
			}]
		};
	}
]);
