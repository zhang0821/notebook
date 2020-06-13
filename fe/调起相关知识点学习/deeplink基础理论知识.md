https://juejin.im/post/5bea503ce51d454e2e1e75be



https://www.jianshu.com/p/909999e398e6



##deepLink深度链接

这个链接不是仅仅打开一个网站，, 而是直接地打开这个网站中的某个具体内容页面

`优势`

	1. 在web页面和app的切换过程中保留了上下文
	2. App间的切换保留了上下文，实现app间参数的传递
	3. Web页可以被搜索引擎索引，可以增加SEO的访问量从而提高app下载量和开启率。

Android、iOS都推出了相应的概念去实现深链接。于是就有了Universal Link、App Link、URL schemes.



### URI Schemes

- URI : universal resource identifier
- URL : universal resource locator
- URN : universal resource name

大家应该都对http:// 非常熟悉，而它就是一个scheme，也就是一个url的开头部分。
 有兴趣也可以去看我在之前写过一篇关于URL scheme的介绍：[iOS-URL Schemes](https://www.jianshu.com/p/2c1f1735fe38) 。而有了以上概念之后，我们可以了解到，实际上scheme不仅仅可以指URL的开头，URI的开头也一样的是scheme。

那么回到正题，来讲它和deep link的关系。URI Schemes其实就是实现deep linking的第一代解决方案。利用它就可以在移动开发中实现从web页面或者别的app中唤起自己的app的功能，然而开发者们很快就发现，这样也还有很多限制：

- 当要被唤起的app没有安装时，这个链接就会出错。
- 当注册有多个scheme相同的时候，目前没有办法区分。

因此为了解决以上问题，苹果和安卓都有了自己的第二套解决方案，分别是iOS的Universal Link，和安卓的App Link。



作者：Edie小哪吒
链接：https://www.jianshu.com/p/909999e398e6
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

### URL  Scheme

### ULink

`前言：Custom URL Scheme`
iOS在之前的很长一段时间内用来实现deep linking以及app间通信的方法就是上面提到的，被叫做custom URL scheme。

###App Link

###Deferred Deep Link

无论是URI Scheme还是Universal Link都没有解决一个问题，就是如果设备上没有安装这个app的时候，保留住此时用户停留的上下文。例如，利用Universal Link，在没有安装app的情况下，iOS能够重定位到app store去引导用户去下载安装这个app，但是在安装之后，app只能打开首页，也就是说丢失了用户在点击跳转进入app之前的那个页面。
 因此，有了一个非常重要的另一个概念：Deferred Deep Link。顾名思义，这里的deferred是延迟的意思，可以理解为延迟一下，在安装过程中keep住跳转前的特定页面内容，在app安装之后，再利用这个link在app里进行跳转。举个例子，用户在某个电商网站上看到一个商品，于是他点击了一个按钮“在app中查看该商品”，但他并没有下载这个app，于是iOS就引导他到了App Store安装这个app，当他安装完成之后，打开这个app，就会自动地在app中跳到他刚才想看的那个商品的页面。这对于商家来说，也就大大提高了用户的转化率。