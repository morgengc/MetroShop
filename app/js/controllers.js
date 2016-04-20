'use strict';

/**
 * 控制器模块
 * @module shopcatControllers
 */
var shopcatControllers = angular.module('shopcatControllers', []);

/**********************************************
 *                 路由页面控制器                *
 *********************************************/

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
		$scope.pageClass = "page-list";

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
 * shop-list.html使用的控制器，按搜索结果分页显示
 *
 * @method ShopSearchCtrl
 * @param {Object} $rootScope   用于所有控制器之间共享数据
 * @param {Object} $scope       HTML与控制器之间绑定数据
 * @param {Object} $http        获取JSON数据
 * @param {Object} $routeParams URL的路由规则获取
 * @return undefined
 */
shopcatControllers.controller('ShopSearchCtrl', ['$rootScope', '$scope', '$http', '$routeParams',
	function($rootScope, $scope, $http, $routeParams) {
		$scope.pageClass = "page-list";

		$http.get('data/MetroShops.json').success(function(data) {
			// 按照店铺名称过滤，返回仅包括关键字的店铺
			var fData = [];
			for (var i=0; i<data.length; i++) {
				if (data[i]["ShopGroup"].indexOf($routeParams.keyword) >= 0) {
					fData.push(data[i]);
				}
			}

			var start = ($routeParams.pid-1)*$rootScope.pageSize;
			var end = start + $rootScope.pageSize;
			$scope.shops = fData.slice(start, end);

			// 总页面数
			$rootScope.allPage = (parseInt(fData.length)%$rootScope.pageSize == 0) ?
				(parseInt(fData.length/$rootScope.pageSize)) :
				(parseInt(fData.length/$rootScope.pageSize) + 1);
		});
	}
]);

/**
 * shop-list.html使用的控制器，按区域显示每个分页
 *
 * @method ShopDistrictCtrl
 * @param {Object} $rootScope   用于所有控制器之间共享数据
 * @param {Object} $scope       HTML与控制器之间绑定数据
 * @param {Object} $http        获取JSON数据
 * @param {Object} $routeParams URL的路由规则获取
 * @return undefined
 */
shopcatControllers.controller('ShopDistrictCtrl', ['$rootScope', '$scope', '$http', '$routeParams',
	function($rootScope, $scope, $http, $routeParams) {
		$scope.pageClass = "page-list";

		$http.get('data/MetroShops.json').success(function(data) {
			// 根据缩写提取区域. 如"yz"则返回"渝中区"
			var district = "渝中区";
			for (var i=0; i<$rootScope.districts.length; i++) {
				if ($rootScope.districts[i].abbreviation == $routeParams.did) {
					district = $rootScope.districts[i].name;
					break;
				}
			}

			// 抽取该区域的数据
			var fData = [];
			for (var i=0; i<data.length; i++) {
				if (data[i].District == district) {
					fData.push(data[i]);
				}
			}

			var start = ($routeParams.pid-1)*$rootScope.pageSize;
			var end = start + $rootScope.pageSize;
			$scope.shops = fData.slice(start, end);

			// 总页面数
			$rootScope.allPage = (parseInt(fData.length)%$rootScope.pageSize == 0) ?
				(parseInt(fData.length/$rootScope.pageSize)) :
				(parseInt(fData.length/$rootScope.pageSize) + 1);
		});
	}
]);


/**
 * shop-map.html页面使用的控制器，用于显示每个店铺的地图
 *
 * @method ShopMapCtrl
 * @param {Object} $scope       HTML与控制器之间绑定数据
 * @param {Object} $routeParams URL的路由规则获取
 * @return undefined
 */
shopcatControllers.controller('ShopMapCtrl', ['$scope', '$routeParams',
	function($scope, $routeParams) {
		$scope.pageClass = "page-map";
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
				title: 'TODO: title',
				content: 'TODO: description'
			}]
		};
	}
]);

/**
 * about.html页面使用的控制器
 *
 * @method AboutCtrl
 * @param {Object} $scope HTML与控制器之间绑定数据
 * @return undefined
 */
shopcatControllers.controller('AboutCtrl', ['$scope',
	function($scope) {
		$scope.pageClass = "page-about";
	}
]);

/**
 * contact.html页面使用的控制器
 *
 * @method ContactCtrl
 * @param {Object} $scope HTML与控制器之间绑定数据
 * @return undefined
 */
shopcatControllers.controller('ContactCtrl', ['$scope',
	function($scope) {
		$scope.pageClass = "page-contact";
	}
]);

/**********************************************
 *                  局部控制器                  *
 *********************************************/

/**
 * 分页控件使用的控制器，用于分页控制
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
		$scope.currentPage = 1;		// 标记当前页面

		/**
		 * 显示当前是第几页
		 * 从URL中解析出当前页面的ID, 即"app/#/page/1"中井号后面的内容："/page/1".
		 * 然后通过JavaScript的slice函数取出斜杠后面的字符，并转换成数字.
		 * 该函数仅执行一次，因此定义后立即执行
		 * @method init
		 * @param 无
		 * @return undefined
		 */
		$scope.init = (function() {
			var index = $location.path().lastIndexOf("/");
			var pageNum = parseInt($location.path().slice(index+1));
			$scope.currentPage = pageNum;
		})();

		/**
		 * 定位到前面一个分页
		 * @method previous
		 * @param 无
		 * @return undefined
		 */
		$scope.previous = function () {
			var index = $location.path().lastIndexOf("/");
			var prefix = $location.path().slice(0, index+1);
			var pageNum = parseInt($location.path().slice(index+1)) - 1;
			if (pageNum < 1) {
				alert('已经到达第一页');
			} else {
				$location.path(prefix+pageNum);	// 向前翻一页
				$scope.currentPage = pageNum;	// 更新当前页数
			}
		};

		/**
		 * 定位到后面一个分页
		 * @method next
		 * @param 无
		 * @return undefined
		 */
		$scope.next = function () {
			var index = $location.path().lastIndexOf("/");
			var prefix = $location.path().slice(0, index+1);
			var pageNum = parseInt($location.path().slice(index+1)) + 1;
			if (pageNum > $rootScope.allPage) {
				alert('已经到达最后一页');
			} else {
				$location.path(prefix+pageNum);	// 向后翻一页
				$scope.currentPage = pageNum;	// 更新当前页数
			}
		};

		/**
		 * 直接跳转到指定页码
		 * @method goToPage
		 * @param 无
		 * @return undefined
		 */
		$scope.goToPage = function () {
			var index = $location.path().lastIndexOf("/");
			var prefix = $location.path().slice(0, index+1);

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
 * Dropdown控件使用的控制器，用于构造URL
 *
 * @method DropdownCtrl
 * @param {Object} $rootScope 用于所有控制器之间共享数据
 * @param {Object} $scope     HTML与控制器之间绑定数据
 * @return undefined
 */
shopcatControllers.controller('DropdownCtrl', ['$rootScope', '$scope',
	function($rootScope, $scope) {
		$rootScope.districts = [
			{ "name": "渝中区", "abbreviation": "yz" },
			{ "name": "江北区", "abbreviation": "jb" },
			{ "name": "南岸区", "abbreviation": "na" },
			{ "name": "沙坪坝区", "abbreviation": "spb" },
			{ "name": "渝北区", "abbreviation": "yb" },
			{ "name": "大渡口区", "abbreviation": "ddk" },
			{ "name": "九龙坡区", "abbreviation": "jlp" },
			{ "name": "巴南区", "abbreviation": "bn" },
			{ "name": "北碚区", "abbreviation": "bb" }
		];
	}
]);

