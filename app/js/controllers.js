'use strict';

/**
 * 控制器模块
 * @module shopcatControllers
 */
var shopcatControllers = angular.module('shopcatControllers', []);

/**
 * shop-list.html页面使用的控制器，用于分页控制
 *
 * @method ShopIndexCtrl
 * @param {Object} $rootScope 用于所有控制器之间共享数据
 * @param {Object} $scope     HTML与控制器之间绑定数据
 * @param {Object} $location  分析浏览器地址栏中的URL
 * @return undefined
 */
shopcatControllers.controller('ShopIndexCtrl', ['$rootScope', '$scope', '$location',
	function($rootScope, $scope, $location) {
		$rootScope.pageSize = 5;	// 每页显示的纪录数

		var prefix = "/page/";

		/**
		 * 定位到前面一个分页
		 * @method previous
		 * @param 无
		 * @return undefined
		 */
		$scope.previous = function () {
			// 从浏览器的地址栏获取路径，即"app/#/page/1"中井号后面的内容："/page/1"
			// 然后通过JavaScript的slice函数取出斜杠后面的字符，并转换成数字。
			var pageNum = parseInt($location.path().slice(prefix.length)) - 1;
			if (pageNum < 1) {
				alert('已经到达第一页');
			} else {
				// 如果现在没有处在第一页，则path属性减去1，即向前翻一页。
				$location.path(prefix+pageNum);
			}
		};

		/**
		 * 定位到后面一个分页
		 * @method next
		 * @param 无
		 * @return undefined
		 */
		$scope.next = function () {
			var pageNum = parseInt($location.path().slice(prefix.length)) + 1;
			if (pageNum > $rootScope.allPage) {
				alert('已经到达最后一页');
			} else {
				$location.path(prefix+pageNum);
			}
		};

		/**
		 * 直接跳转到指定页码
		 * @method goToPage
		 * @param 无
		 * @return undefined
		 */
		$scope.goToPage = function () {
			// 从input输入框绑定的currentPage变量中获取用户输入的值
			var pageNum = $scope.currentPage;

			if (pageNum == null || pageNum == undefined || pageNum == "") {
				alert("请输入想要跳转的页码");
			} else if (!(pageNum >= 1 && pageNum <= $rootScope.allPage)) {
				alert("输入的页码超过了最大页码数")
			} else {
				$location.path(prefix+pageNum);
			}
		};
	}
]);

/**
 * shop-list.html页面使用的控制器，用于显示每个分页
 *
 * @method ShopListCtrl
 * @param {Object} $rootScope   用于所有控制器之间共享数据
 * @param {Object} $scope       HTML与控制器之间绑定数据
 * @param {Object} $http        获取JSON数据
 * @param {Object} $routeParams URL的路由规则获取
 * @return undefined
 */
shopcatControllers.controller('ShopListCtrl', ['$rootScope', '$scope', '$http', '$routeParams',
	function($rootScope, $scope, $http, $routeParams) {
		$http.get('data/MetroShops.json').success(function(data) {
			// 注意：json数组的索引是从1开始，而返回的数据是个数组，下标从0开始
			var start = ($routeParams.pid-1)*$rootScope.pageSize;
			var end = start + $rootScope.pageSize;
			$scope.shops = data.slice(start, end);

			// 总页面数
			$rootScope.allPage = (parseInt(data.length)%$rootScope.pageSize == 0) ?
				(parseInt(data.length/$rootScope.pageSize)) :
				(parseInt(data.length/$rootScope.pageSize) + 1);
		});
	}
]);

/**
 * shop-detail.html页面使用的控制器，用于显示每个店铺的地图
 *
 * @method ShopDetailCtrl
 * @param {Object} $scope       HTML与控制器之间绑定数据
 * @param {Object} $routeParams URL的路由规则获取
 * @return undefined
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
