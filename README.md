# MetroShop

我的AngularJS练手项目。重庆公交卡消费门店查询，演示AngularJS分页控制和百度地图定位。

实现的功能：

 - 按关键字查询并分页显示结果
 - 按区域查询并分页显示结果
 - 页面切换动画效果
 - 页面屏幕自适应


## 1. 准备数据

### 1.1 原始数据获取
公交卡消费门店数据是通过“[八爪鱼](http://www.bazhuayu.com)”软件自动抓取的，抓取规则叫做“[重庆交通卡签约商户列表](http://www.bazhuayu.com/RuleMarketDetail?id=5702)”，已经公布到八爪鱼平台。抓取的数据以Excel存放。

### 1.2 根据店铺地址获取具体经纬度
我使用了一款叫做“[XGeocoding](http://www.gpsspg.com/xgeocoding/)”的软件，它可以读入Excel文件，指定地址列后，它就可以根据地址自动找出各大地图的坐标，包括Google地图，百度地图等。经纬度添加到原Excel文件中存放。

### 1.3 Excel -> Json
找到了一个开源工具，是用Go语言实现的，功能说明见[这个网页](http://www.cocoachina.com/bbs/read.php?tid-280731.html)，工具托管在[Github](https://github.com/sandao/ExcelTool.git)上。该工具只是将数据按照Json格式组装了一下，对字符串内容没有进行检查，因此生成的Json文件难免出现格式问题。

### 1.4 Json格式验证
安装Firefox的附加组件JSONView，装好后没有图标，只要将Json文件拖到Firefox中，如果格式正确就会显示，如果不正确会提示错误行。
这个工具比大多数在线检测工具靠谱，因为数据量稍微大一点，浏览器就会假死，没法检查哪里出了问题。

## 2. 功能实现

### 2.1 实现分页
由于涉及到多种模式的分页，比如全部数据的分页，搜索关键字的分页，按区域筛选的分页，所以分页模块需要有一定的独立性，不能与展示的数据耦合在一起。

在实现上，分页模块只有有限的几个外部参数:

- `$rootScope.pageSize`, 定义每页显示的条目
- `$rootScope.allPage`, 用于显示总的页数
- `$scope.currentPage`, 用于记录当前是第几页
- `$location.path()`, 获取当前页面的URL，用于构造新的URL，并跳转页面

可以看到，完全跟具体的数据解耦。因此几种分页都可以使用同一个分页控件。得益于此，几种分页情况下，均使用`shop-list.html`来展示数据。

```js
// 店铺分页显示
$routeProvider.when('/page/:pid', {
  templateUrl: 'partials/shop-list.html',
  controller: 'ShopListCtrl'
});

// 按区域分页显示
$routeProvider.when('/district/:did/:pid', {
  templateUrl: 'partials/shop-list.html',
  controller: 'ShopDistrictCtrl'
});

// 按关键字分页显示
$routeProvider.when('/search/:keyword/:pid', {
  templateUrl: 'partials/shop-list.html',
  controller: 'ShopSearchCtrl'
});
```

### 2.2 实现按区域查询
使用标准的BootStrap Dropdown控件来列举区域：
```html
<!-- 区域下拉列表 -->
<div class="dropdown">
	<button type="button" class="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown">
		按区域过滤
		<span class="caret"></span>
	</button>
	<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1" ng-controller="DropdownCtrl">
		<li role="presentation" ng-repeat="district in districts">
			<a role="menuitem" tabindex="-1" href="index.html#district/{{district.abbreviation}}/1">{{district.name}}</a>
		</li>
	</ul>
</div>
```

### 2.3 实现按关键词查询
最容易联想到的是，一个输入框结合一个按钮来实现。

第一种方法，按钮用`<button>`标签

`<button>`标签没有`href`属性，因此无法在点击时自动跳转页面。页面不跳转则不会触发路由，进而不会进入路由中关联的Controller。好在可以点击按钮，触发`ng-click`事件，在Controller中定义事件处理函数，就可以进入Controller。跳转页面需要在事件处理函数中手动完成。该方法尝试过，有问题未深入研究。

第二种方法，按钮用`<a>`标签

`<a>`标签不仅有`href`属性，还有`ng-click`方法。尝试过两种方案，一种是`href`中不包含关键词，通过`ng-click`传入关键词，该方案的关键词在Controller中无法访问，但可以赋值并在页面更新，原因查不出来。第二种方案是仅借助`href`，并且在`href`中包含关键词，在Controller中通过`$routeParams`访问，该方案为最终方案。

```html
<!-- 搜索 输入后即时搜索当前页面 点击按钮搜索全部数据 -->
<div class="input-group">
	<input type="text" class="form-control" ng-model="query" placeholder="本页内搜索">
	<span class="input-group-btn">
		<p class="text-center">
			<a href="index.html#search/{{query}}/1" class="btn btn-default">全局搜索</a>
		</p>
	</span>
</div>
```

### 2.4 实现当前位置周边查询
嵌入百度地图，使用了一个开源项目[BaiduMapForAngularJS](https://github.com/leftstick/BaiduMapForAngularJS)。它封装了一个指令`baiduMap`，配合HTML中使用`baidu-map`标签。具体使用步骤[参考这里](https://github.com/leftstick/BaiduMapForAngularJS/blob/master/docs/APIDocs.md)。

TODO: 实现周边查询功能。

### 2.5 优化手机端浏览效果
UI框架使用了BootStrap，它能够实现多屏幕自适应。
