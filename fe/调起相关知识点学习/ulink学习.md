[掘金的参考文档]: https://juejin.im/post/5dc28383518825108876bd74

https://docs.adjust.com/zh/universal-links/

####背景

`iOS 9`之前，一直使用的是`URL Schemes`技术来从外部对`App`进行跳转，但是`iOS`系统中进行`URL Schemes`跳转的时候如果没有安装`App`，会提示`Cannot open Page`的提示，而且当注册有多个`scheme`相同的时候，目前没有办法区分，但是从`iOS 9`起可以使用`Universal Links`技术进行跳转页面，这是一种体验更加完美的解决方案。

###ulink的介绍

`Universal Link`是`Apple`在`iOS 9`推出的一种能够方便的通过传统`HTTPS`链接来启动`APP`的功能。如果你的应用支持`Universal Link`，当用户点击一个链接时可以跳转到你的网站并获得无缝重定向到对应的`APP`，且不需要通过`Safari`浏览器。如果你的应用不支持的话，则会在`Safari`中打开该链接。

支持`Universal Link`（通用链接） 先决条件：必须有一个支持`HTTPS`的域名，并且拥有该域名下上传到根目录的权限（为了上传`Apple`指定文件）。

###ulink的参数及含义

###ulink运作流程

	（1）app 第一次启动或者更新版本后第一次启动（实际结果，未体现在苹果官方文档上）；
	（2）app 向工程里配置的域名发起 Get 请求拉取 apple-app-site-association Json 文件；
	（3）app 将 apple-app-site-association 注册到系统；
	（4）由任意 WebView 发起跳转 url；
	（5）如果命中了 apple-app-site-association 注册过的通用链接，则打开 app，触发 Universal Link delegate；
	（6）没命中，WebView 继续跳转 url。

在进行 apple-app-site-association 以及 app Xcode 工程配置之后，整个 Universal Link 运作流程完全由系统控制。
###集成实现方式

		需要配置的几个地方：
		1. 开发者中心配置——找到对应的App ID，在Application Services列表里有Associated Domains一条，把它变为Enabled就可以
		2. 工程配置 targets->Capabilites->Associated Domains，在其中的Domains中填入你想支持的域名，必须以applinks:为前缀，如：applinks:domain
		3. 配置指定文件 创建一个内容为json格式的文件，苹果将会在合适的时候，从我们在项目中填入的域名请求这个文件。这个文件名必须为apple-app-site-association，切记没有后缀名


### 注意事项

1. `Universal Link`跨域 `Universal Link`有跨域问题，`Universal Link`必须要求跨域，如果不跨域，就不会跳转（`iOS 9.2`之后的改动） 假如当前网页的域名是`A`，当前网页发起跳转的域名是`B`，必须要求`B`和`A`是不同域名才会触发`Universal Link`，如果`B`和`A`是相同域名，只会继续在当前`WebView`里面进行跳转，哪怕你的`Universal Link`一切正常，根本不会打开`App`
2. `Universal Link`请求`apple-app-site-association`时机

- 当我们的`App`在设备上第一次运行时，如果支持`Associated Domains`功能，那么`iOS`会自动去`GET`定义的`Domain`下的`apple-app-site-association`文件
- `iOS`会先请求`https://domain.com/.well-known/apple-app-site-association`，如果此文件请求不到，再去请求`https://domain.com/apple-app-site-association`，所以如果想要避免服务器接收过多`GET`请求，可以直接把`apple-app-site-association`放在`./well-known`目录下
- 服务器上`apple-app-site-association`的更新不会让`iOS`本地的`apple-app-site-association`同步更新，即`iOS`只会在`App`第一次启动时请求一次，以后除非`App`更新或重新安装，否则不会在每次打开时请求`apple-app-site-association`

###Universal Link的好处

		1. 唯一性：不像自定义的 scheme，因为它使用标准的 http/https 链接到你的 web 站点，所以它不会被其它的 app 所声明。另外，Custom URL scheme 因为是自定义的协议，所以在没有安装 app 的情况下是无法直接打开的，而 universal links 本身是一个 HTTP/HTTPS 链接，所以有更好的兼容性。
		2. 安全：当用户的手机上安装了你的 app，那么 iOS 将去你的网站上去下载你上传上去的说明文件(这个说明文件声明了你的 app 可以打开哪些类型的 http 链接)。因为只有你自己才能上传文件到你网站的根目录，所以你的网站和你的 app 之间的关联是安全的。
		3. 可变：当用户手机上没有安装你的 app 的时候，Universal Links 也能够工作。如果你愿意，在没有安装你的 app 的时候，用户点击链接，会在 safari 中展示你网站的内容。
		4. 简单：一个 URL 链接，可以同时作用于网站和 app。
		5. 私有：其它 app 可以在不需要知道你的 app 是否安装了的情况下和你的 app 相互通信。

   



<img src="/Users/zhangli45/Library/Application Support/typora-user-images/image-20191231143612465.png" alt="image-20191231143612465" style="zoom:50%;" />



<img src="/Users/zhangli45/Library/Application Support/typora-user-images/image-20191231144707706.png" alt="image-20191231144707706" style="zoom:50%;" />

https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html

# [手机百度Universal Links接入方案](http://wiki.baidu.com/pages/viewpage.action?pageId=255729831)

