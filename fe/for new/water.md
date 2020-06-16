<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [html](#html)
  - [为什么标签需要语义化](#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%A0%87%E7%AD%BE%E9%9C%80%E8%A6%81%E8%AF%AD%E4%B9%89%E5%8C%96)
  - [script 设置defer和async的区别](#script-%E8%AE%BE%E7%BD%AEdefer%E5%92%8Casync%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [image标签上 title和alt的区别](#image%E6%A0%87%E7%AD%BE%E4%B8%8A-title%E5%92%8Calt%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [页面样式导入，import和link的区别](#%E9%A1%B5%E9%9D%A2%E6%A0%B7%E5%BC%8F%E5%AF%BC%E5%85%A5import%E5%92%8Clink%E7%9A%84%E5%8C%BA%E5%88%AB)
- [js](#js)
  - [给dom绑定事件的方法有哪些](#%E7%BB%99dom%E7%BB%91%E5%AE%9A%E4%BA%8B%E4%BB%B6%E7%9A%84%E6%96%B9%E6%B3%95%E6%9C%89%E5%93%AA%E4%BA%9B)
  - [判断一个变量为数组](#%E5%88%A4%E6%96%AD%E4%B8%80%E4%B8%AA%E5%8F%98%E9%87%8F%E4%B8%BA%E6%95%B0%E7%BB%84)
  - [cookie和session的区别](#cookie%E5%92%8Csession%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [cookie、localStorage、sessionStorage的区别](#cookielocalstoragesessionstorage%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [js的数据类型](#js%E7%9A%84%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)
  - [浮点精度丢失问题](#%E6%B5%AE%E7%82%B9%E7%B2%BE%E5%BA%A6%E4%B8%A2%E5%A4%B1%E9%97%AE%E9%A2%98)
  - [js的哪些方法可以修改作用域链](#js%E7%9A%84%E5%93%AA%E4%BA%9B%E6%96%B9%E6%B3%95%E5%8F%AF%E4%BB%A5%E4%BF%AE%E6%94%B9%E4%BD%9C%E7%94%A8%E5%9F%9F%E9%93%BE)
  - [==和===的区别](#%E5%92%8C%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [什么事事件冒泡、怎么阻止、利用事件冒泡可以干什么](#%E4%BB%80%E4%B9%88%E4%BA%8B%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A1%E6%80%8E%E4%B9%88%E9%98%BB%E6%AD%A2%E5%88%A9%E7%94%A8%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A1%E5%8F%AF%E4%BB%A5%E5%B9%B2%E4%BB%80%E4%B9%88)
  - [如何阻止默认事件](#%E5%A6%82%E4%BD%95%E9%98%BB%E6%AD%A2%E9%BB%98%E8%AE%A4%E4%BA%8B%E4%BB%B6)
  - [如何实现对象的克隆、深拷贝、浅拷贝问题](#%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%85%8B%E9%9A%86%E6%B7%B1%E6%8B%B7%E8%B4%9D%E6%B5%85%E6%8B%B7%E8%B4%9D%E9%97%AE%E9%A2%98)
  - [forEach和map的区别](#foreach%E5%92%8Cmap%E7%9A%84%E5%8C%BA%E5%88%AB)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## html
### 为什么标签需要语义化
1。 更加标准化，让机器更懂HTML。（爬虫（seo））

2。浏览器对于不同标签有默认的css（h、strong）

3。专注内容与结构（header、footer、time）
不同的语义化标签，实际上分割了不同的内容。实现了模块化，便于团队开发和维护

4。内容权重差异化，
如果我们可以通过语义化标签，将网页的重点：比如文章的内容，放在一个article，不太重点的广告词、文章推荐列表放在aside里，就可以成功分化不同内容的权重。
搜索引擎可能给某些语义化标签更高一点的权重，从而提高搜索精准度


### script 设置defer和async的区别

### image标签上 title和alt的区别
`alt`: 替换文字。图片的等价描述，图片无法加载时显示
图片的特有属性。设置后可以：

    1 读屏器阅读图片（盲人阅读图片）
    2 提高可访问性，设置有意义的值，搜索引擎会重点分析
`title`：提示文字。提供建议性的信息
global attribute之一，其余还有：

    base，basefont，head，html，meta，param，script

鼠标滑动到元素上时显示内容。


### 页面样式导入，import和link的区别
1. 提供方不同

    
    @import是 CSS 提供的语法规则，只有导入样式表的作用；
    
    link是HTML提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性
2. 网页加载顺序不同

    
    @import是在页面加载完成后才加载
    
    link是在加载页面时，进行同步加载的
    
3. 兼容性区别

    
    link没有兼容性问题
    
    import是css2.1才有的属性。
    
4. 权重，优先级区别（实验验证）

说link的优先级高于import，是因为样式渲染是可以后面的覆盖前面的同名样式的。

虽然import的样式是后于link的样式的，但因为import的css样式会在`加载完毕后置于样式表顶部`，
最终渲染时自然会被下面的同名样式（可能是link进的样式，可能是style标签内的，可能是html的内联样式）层叠。

## js

### 给dom绑定事件的方法有哪些

### 判断一个变量为数组

### cookie和session的区别

### cookie、localStorage、sessionStorage的区别

### js的数据类型

### 浮点精度丢失问题

### js的哪些方法可以修改作用域链

### ==和===的区别

### 什么事事件冒泡、怎么阻止、利用事件冒泡可以干什么
stopPreparation
### 如何阻止默认事件
defaultPrevent（阻止的默认事件是这一类的：比如 右键鼠标，显示可操作菜单）

### 如何实现对象的克隆、深拷贝、浅拷贝问题

### forEach和map的区别
map & forEach 都是遍历可迭代对象
1. 返回值区别
`map(callback[, thisArg]);`返回一个新数组；

    map 遍历数组时，循环里每次执行callback都要显示返回一个值，如果没有，则会返回undefined.

`forEach(callback[, thisArg]);`返回undefined；

2. 速度快慢区别
 map 比 forEach 快？这个实验后，发现是不确定的。而且对于现代浏览器来说，这点小差别其实无关紧要，但是肯定的是，它们都比 for 循环慢
 
 为什么原生的foreach和map的操作函数，都比for循环慢？ 查询它们内部的额源码可以发现，
 forEach在内部包含许多检查，并不像简单的循环那样简单,例如下面的源码
 ```js
if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisArg */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t)
        fun.call(thisArg, t[i], i, t);
    }
  };
}
```
// todo
### 实现一个简单限流方案（防抖和节流）（500ms内 点击只触发一次）

### js异步发展史：回掉、promise、generator、async await

### call、apply、bind的异同，自己实现一个bind/apply/call

// todo
### 节流和防抖

### new一个对象时，发生了什么

### 什么时闭包、优缺点和使用场景

## css

### iconfont实现原理
啥是iconfont？—— 图标字体
原理： 其实就是一个字体库的一一对应关系

    每种字体在相同的字都是不一样的，比如 宋体 跟 微软雅黑 ，相同的字 ，由于调用的不同的字体，浏览器显示明显是有区别的。
    
    在我们还不识字的时候，每个字都是一个图案，所以老师会告诉你哪个图案念什么 ，是什么字，iconfont 同理，我认为 三角形 是 a，那对于我来说，只要是 a ，就应该是个 三角形。
    
    在电脑上，我给电脑规定 a 的样子是个 三角形，那么当显示 a 的时候，他就显示个三角形。
    
    当我把网页上的所有图标都对应一个字符的时候，你在代码里输入某个字符，那这个字符就显示你规定的形状，这就是 iconfont 图标。
    
    把所有的图标都放在一个字体里面，就是一个字体库了，然后按照正常字体库（本来就是正常的字体库）调用就行了。
    
WebFont 技术
    可以让网页使用在线字体，在国外，WebFont 已经非常流行了，英文字体只有26个字母，一套字体不过几十 KB ，
    而汉字却有数万个，导致字体文件通常有好几 MB 大小，再加上国内的网络环境，显然不现实。
    所以中文的 特殊字体 必须经过压缩才能使用
    
### jpeg、png、gif

### position哪些属性

### 简单说一下盒子模型

### 移动端适配

### 如何让chrome支持小于12px
通过缩放实现 `scale`
tips：scale属性只对可以定义宽高的元素有效

实现：例如显示10px的字体
    
    .chrome_adjust{
        font-size: 10px; //针对可以识别12px以下字体大小的浏览器
        -webkit-transform: scale(0.8); //谷歌下，对于10px显示为12px,此时做0.8的缩放
        -webkit-transform-origin-X: left; //定义文字相对于X轴的位置
        -o-transform: scale(1); //针对能识别-webkit的opera browser设置  
        display: inline-block;
    }
   

### 移动端1px问题

问题描述：在高清屏下，移动端的1px 会很粗。（比如给一个div设置border，高清屏的边框就比一般的看起来更粗）

问题根源：设备像素比DPR(devicePixelRatio)的问题

         DPR: 默认缩放为100%的情况下，设备像素和CSS像素的比值 `window.devicePixelRatio=物理像素 /CSS像素`
   目前，主流的屏幕的DPR=2，iphone8p为3，
   以二倍屏(DPR=2)为例子,要实现物理像素 1px:
   
        则css的像素为 1/2=0.5 
        以750的视觉稿（也就是代表：视觉稿的1px是以750为参考的，则css样式是以设备375为参照的。所以css的值写0.5px）
        0.5px的像素是否能显示？` iOS 8+系统支持，安卓系统不支持`
        
解决方案：

    1.WWDC对iOS统给出的方案:支持iOS 8+下，写0.5px是可以识别的。
        但是在三倍屏上（8p手机），换算出来是0.3333px，这个物理值，8p手机上就不显示了。（小于0.46px像素后，就不显示了）
    
    2.使用边框图片
        border: 1px solid transparent;
        border-image: url('./../../image/96.jpg') 2 repeat;

    3.使用box-shadow实现（推荐2）
        box-shadow: 0  -1px 1px -1px #e5e5e5,   //上边线
                    1px  0  1px -1px #e5e5e5,   //右边线
                    0  1px  1px -1px #e5e5e5,   //下边线
                    -1px 0  1px -1px #e5e5e5;   //左边线
    4. 使用伪元素(推荐1)
        一条border：
            .setOnePx{
              position: relative;
              &::after{
                position: absolute;
                content: '';
                background-color: #e5e5e5;
                display: block;
                width: 100%;
                height: 1px; /*no*/
                transform: scale(1, 0.5);
                top: 0;
                left: 0;
              }
            }
            将伪元素设置绝对定位，并且和父元素的左上角对齐，将width 设置100%，height设置为1px，然后进行在Y方向缩小0.5倍
        
        4条border：
            .setBorderAll{
                 position: relative;
                   &:after{
                       content:" ";
                       position:absolute;
                       top: 0;
                       left: 0;
                       width: 200%;
                       height: 200%;
                       transform: scale(0.5);
                       transform-origin: left top;
                       box-sizing: border-box;
                       border: 1px solid #E5E5E5;
                       border-radius: 4px;
                  }
                }
                
    5. 设置viewport的scale值(推荐！！)
              var viewport = document.querySelector("meta[name=viewport]");
              //下面是根据设备像素设置viewport
              if (window.devicePixelRatio == 1) {
                  viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
              }
              if (window.devicePixelRatio == 2) {
                  viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
              }
              if (window.devicePixelRatio == 3) {
                  viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');
              }
              var docEl = document.documentElement;
              var fontsize = 32* (docEl.clientWidth / 750) + 'px';
              docEl.style.fontSize = fontsize;
                
### style协议，body前和body后有什么区别

主要还是涉及到浏览器的渲染机制。页面渲染css多次被覆盖，重新渲染的效能问题。

    写在body标签前利于浏览器逐步渲染：resources downloading->CSSOM+DOM->RenderTree(composite)->Layout->paint

写在body后的弊端：先加载标签， 然后渲染样式。 如果加载慢的话， 你会看到他会跳舞

      由于浏览器以逐行方式对html文档进行解析；

      当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染；

      在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）；
      

### box-sizing设置border-box后有什么影响

### 设置dom的style时，优先级问题（css选择器优先级）
!important > 行内样式 > ID > 类、伪类、属性 > 标签名 > 继承 > 通配符
### 手写动画最小时间间隔是多少、为什么
这个跟显示器的频率X有关。所以最小间隔就是(1/X * 1000)ms
多数显示器的频率是：60hz，即每秒刷新60次,所以这时最小间隔是 1/60*100 = 16.7ms

### 元素垂直、水平 居中的方法

### opacity：0、display：none、visibility：hidden的区别和使用场景


## 浏览器

### jsonp和ajax的区别与联系

### 重绘和重排，以及优化问题

### cookie和token都放在header里面，为什么不会出现token劫持
1、首先token不是防止XSS的，而是为了防止CSRF的；
2、CSRF攻击的原因是浏览器会自动带上cookie，而浏览器不会自动带上token

### 如何实现token加密

### 输入一个网址，都发生了什么

### 什么是跨域，有哪些解决方案

## 算法和数据结构

### 栈

### 队列

### 链表

### 字典

### 二叉树

###  排序

### 斐波那契

### 动态规划

### 贪心算法

## 了解跨平台解决方案：hybrid、RN/Weex、小程序、electron等

## 开发框架设计思想、优劣
## react
### 兄弟组件之间怎么传数据
### redux使用场景和原理

### redux-saga

### 为什么虚拟dom会提高性能

浏览器对于dom的构建：DOM树的构建过程是一个深度遍历过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点。

### diff算法

### 了解shouldComponentUpdate吗？

## vue
### v-if和v-show的区别

### vuex使用场景和简单原理

### 自组件为什么不可以修改父组件传递的prop

### 如何知道dom渲染完成（nextTick）

### 业务异步获取数据应该写在哪个生命周期中，为什么

### 兄弟组件之间怎么传数据

### vue在v-for时给每个元素绑定事件需要用到事件代理吗，为什么

### vue数据双向绑定原理

### 如何让css只在当前组件中起作用

## hybrid实现原理

## 计算机网络 

### 说下http 1.0 1.1 2.0 3.0的区别

发展史：@see https://juejin.im/post/5dbe8eba5188254fe019dabb

`0.9:` 
    
    因为HTTP都是基于TCP协议的，所以客户端先要根据IP地址、端口和服务器建立TCP连接，而建立连接的过程就是TCP协议三次握手的过程。
    建立好连接之后，会发送一个GET请求行的信息，如GET /index.html用来获取index.html。
    服务器接收请求信息之后，读取对应的HTML文件，并将数据以ASCII字符流返回给客戶端。
    HTML文档传输完成后，断开连接。
以下三个特点：

    第一个是只有一个请求行，并没有HTTP请求头和请求体，因为只需要一个请求行就可以完整表达客戶端的需求了。
    第二个是服务器也没有返回头信息，这是因为服务器端并不需要告诉客戶端太多信息，只需要返回数据就 可以了。
    第三个是返回的文件内容是以ASCII字符流来传输的，因为都是HTML格式的文件，所以使用ASCII字节码 来传输是最合适的。

`被浏览器推动的HTTP/1.0`
支持多种类型的文件下载是HTTP/1.0的一个核心诉求
HTTP/1.0引入了请求头和响应头，它们都是以为Key-Value形式保存的
在HTTP发送请求时，会带上请求 头信息，服务器返回数据时，会先返回响应头信息。

1. HTTP/1.0的方案是通过请求头和响应头来进行协商，
在发起请求时候会通过HTTP请求头告诉服务器它期待服务器返回什么类型的文件、采取什么形式的压缩、提供什么语言的文件以及文件的具体编码


        accept: text/html
        accept-encoding: gzip, deflate, br
        accept-Charset: ISO-8859-1,utf-8
        accept-language: zh-CN,zh
        其中第一行表示期望服务器返回html类型的文件，第二行表示期望服务器可以采用gzip、
        deflate或者br其中的一种压缩方式，第三行表示期望返回的文件编码是UTF-8或者ISO-8859-1，第四行是表示期望⻚面的优先语言是中文

HTTP/1.0除了对多文件提供良好的支持外，还依据当时实际的需求引入了很多其他的特性，这些特性都是通过请求头和响应头来实现的
几个典型的特性:

    有的请求服务器可能无法处理，或者处理出错，这时候就需要告诉浏览器服务器最终处理该请求的情况，这就引入了状态码。状态码是通过响应行的方式来通知浏览器的。
    
    为了减轻服务器的压力，在HTTP/1.0中提供了Cache机制，用来缓存已经下载过的数据。
    
    服务器需要统计客戶端的基础信息，比如Windows和macOS的用戶数量分别是多少，所以HTTP/1.0的请求头中还加入了用戶代理的字段。

`缝缝补补的HTTP/1.1`

1. 改进持久连接 keep-alive (Connection: close设置关闭持久链接)，目前浏览器中对于同一个域名，默认允许同时建立6个TCP持久连接

2. 不成熟的HTTP管线化.
持久连接虽然能减少TCP的建立和断开次数，但是它需要等待前面的请求返回之后，才能进行下一次请求。如果TCP通道中的某个请求因为某些原因没有及时返回，那么就会阻塞后面的所有请求，这就是著名的队头阻塞的问题
3. 提供虚拟主机的支持(host字段)
在HTTP/1.0中，每个域名绑定了一个唯一的IP地址，因此一个服务器只能支持一个域名。但是随着虚拟主机技术的发展，需要实现在一台物理主机上绑定多个虚拟主机，每个虚拟主机都有自己的单独的域名，这些单独的域名都公用同一个IP地址。
因此，HTTP/1.1的请求头中增加了Host字段，用来表示当前的域名地址，这样服务器就可以根据不同的Host值做不同的处理

4. 对动态生成的内容提供了完美支持
1.0时：Content-Length: 901，字段，浏览器来以根据设置的数据大小来接收数据
HTTP/1.1：通过引入Chunk transfer机制来解决这个问题。服务器会将数据分割成若干个任意大小的数据 块，每个数据块发送时会附上上个数据块的⻓度，最后使用一个零⻓度的块作为发送数据完成的标志
5。 客戶端Cookie、安全机制

`1.+总结`

    HTTP是浏览器和服务器的通信语言
    诞生之初的HTTP/0.9因为需求简单，所以和服务器之间的通信过程也相对简单。
    HTTP/1.0引入了请求头和响应头，主要是为了支持多种类型的文件下载；其次，还提供了Cache机制、用户代理、状态码等基础信息。
    随着技术和需求的发展，人们对文件传输的速度要求越来越高，故又基于HTTP/1.0推出了HTTP/1.1，增 加了持久连接方法来提升连接效率，同时还尝试使用管线化技术提升效率(不过由于各种原因，管线化技术 最终被各大厂商放弃了)。除此之外，HTTP/1.1还引入了Cookie、虚拟主机的支持、对动态内容的支持等特性。

`2.0`

1.1的核心优化点：

    1.  增加了持久连接;
    2.  浏览器为每个域名最多同时维护6个TCP持久连接; 
    3.  使用CDN的实现域名分片机制。
    
1.1 核心缺点：HTTP/1.1对带宽的利用率却并不理想

原因：

    1.慢启动问题
    一旦一个TCP连接建立之后，就进入了发送数据状态，刚开始TCP协议会采用一个非常慢的速度去发送数据，
    然后慢慢加快发送数据的速度，直到发送数据的速度达到一个理想状态.
    
    之所以说慢启动会带来性能问题，是因为页面中常用的一些关键资源文件本来就不大，
    如HTML文件、 CSS文件和JavaScript文件，通常这些文件在TCP连接建立好之后就要发起请求的，但这个过程是慢启动，
    所以耗费的时间比正常的时间要多很多，这样就推迟了宝贵的首次渲染页面的时间了。
    
    慢启动是TCP为了减少网络拥塞的一种策略，我们是没有办法改变的。
    
    2.开启了多条TCP连接，那么这些连接会竞争固定的带宽
    3.HTTP/1.1队头阻塞的问题
    HTTP/1.1中使用持久连接时，虽然能公用一个TCP管道，但是在一个管道中同 一时刻只能处理一个请求，
    在当前的请求没有结束之前，其他的请求只能处于阻塞状态。
    这意味着我们不能 随意在一个管道中发送请求和接收内容
带宽利用率低的原因总结：

    1。慢启动和TCP连接之间相互竞争带宽是由于TCP本身的机制导致的
    2。而队头阻塞是由于HTTP/1.1的机制导致的

**所以针对这些缺点，HTTP/2 需要：一个域名只使用一个TCP连接和消除队头阻塞问题**

`规避TCP的慢启动和TCP连接之间的竞争问题`：
一个域名只使用一个TCP⻓连接来传输数据，这样整个页面资源的下载过程只需要一次慢启动，同时也避免了多个TCP连接竞争带宽所带来的问题。

`队头阻塞问题`——多路复用

虽然HTTP/2解决了HTTP/1.1中的队头阻塞问题，但是HTTP/2依然是基于TCP协议的，而TCP协议依然存在数据包级别的队头阻塞问题.

`http/3 —— 甩掉TCP、TLS的包袱，构建高效网络`
目前2.0体现出来的缺点：
1。TCP上的队头阻塞（不是1.0中链路级别）
    
    在2.0的分包传输中，如果有一个数据因为网络故障或者其他原因而丢包了，那么整个TCP的连接就 会处于暂停，等待数据包重新传输。
    
    在HTTP/2中，多个请求是跑在一个TCP管道中的，如果其中任意一路数据流中出现了丢包的情况，
    那么就会阻塞该TCP连接中的所有请求。这不同于HTTP/1.1，
    使用HTTP/1.1时，浏览器为每个域名开启了6个TCP连接，如果其中的1个TCP连接发生了队头阻塞，
    那么其他的5个连接依然可以继续传 输数据。所以随着丢包率的增加，HTTP/2的传输效率也会越来越差。
 2。 TCP建立连接的延时
 三次握手的网络延时，tcp的1.5个RTT和https中需要的TSL链接产生的1～2个RTT
 
 #### 新的协议：quic协议！——基于udp
HTTP/3选择了一个折衷的方法——UDP协议，基于UDP实现了类似于 TCP的多路数据流、传输可靠性等功能，我们把这套功能称为QUIC协议。   

QUIC在UDP的基础之上，增加了一层来保证数据可靠性传输。它提供了数据包重传、拥塞控制以及其他一些TCP中存在的特性。
### http2的多路复用
每个请求都有一个对应的ID，这样在浏览器端，就可以随时将请求发送给服务器了。

    服务器端接收到这些请求后，会根据自己的喜好来决定优先返回哪些内容（比如哪些准备好了，就优先发送返回这些数据）。
    之所以可以随意发送，是因为每份数据都有对应的ID，浏览器接收到之后，会筛选出相同ID的内容，将其拼接为完整的HTTP响应数据。所以不需要等待一个拼接一个。

使用多路复用技术，可以将请求分成一帧一帧的数据去传输，多路复用技术，可以将请求分成一帧一帧的数据去传输，这样做的额外好处是：
    
    就是 当收到一个优先级高的请求时，
    比如接收到JavaScript或者CSS关键资源的请求，
    服务器可以暂停之前的请 求来优先处理关键资源的请求
    
`多路复用的实现`
通过引入`二进制分帧制`,实现了HTTP的多路复用技术

    首先，浏览器准备好请求数据，包括了请求行、请求头等信息，如果是POST方法，那么还要有请求体。
    
    这些数据经过二进制分帧层处理之后，会被转换为一个个带有请求ID编号的帧，通过协议栈将这些帧发送 给服务器。
    
    服务器接收到所有帧之后，会将所有相同ID的帧合并为一条完整的请求信息。
   
    然后服务器处理该条请求，并将处理的响应行、响应头和响应体分别发送至二进制分帧层。
    
    同样，二进制分帧层会将这些响应数据转换为一个个带有请求ID编号的帧，经过协议栈发送给浏览器。
    
    浏览器接收到响应帧之后，会根据ID编号将帧的数据提交给对应的请求。
    
基于二进制分帧层，HTTP/2还附带实现了很多其他功能

    1.可以设置请求的优先级
    2.服务器推送
    除了设置请求的优先级外，HTTP/2还可以直接将数据提前推送到浏览器。
    你可以想象这样一个场景，当用 戶请求一个HTML⻚面之后，服务器知道该HTML⻚面会引用几个重要的JavaScript文件和CSS文件，
    那么在 接收到HTML请求之后，附带将要使用的CSS文件和JavaScript文件一并发送给浏览器，
    这样当浏览器解析 完HTML文件之后，就能直接拿到需要的CSS文件和JavaScript文件，
    这对首次打开⻚面的速度起到了至关重要的作用。
    3.头部压缩

### 通过什么手段使udp数据可靠传输
（详见http3.0的实现）
### tcp和udp区别

### 计算机五层网络中，tcp/udp/http 处于哪一层

### https的中间人攻击

### https的握手过程、以及握手过程中客户端如何校验证书合法

### 线程进程区别、进程需要通信，县城需要吗？

### 301 302 304区别

// todo
## 前端安全（一般的前端攻击方法）
### csrf？ 如何解决？
什么是csrf

csrf是如何实现的，通过哪些途径，哪些case场景

怎么防止csrf

### xss？ 如何解决？
什么是xss

xss是如何实现的，通过哪些途径，哪些case场景

怎么防止xss

## 前端性能优化
### 前端性能指标，如何判断一个页面性能好？
### 介绍下做过的前端性能优化方案
（网络层面：数据请求、请求压缩）
（渲染层面）
（策略层面：预加载、懒加载、节流、防抖）




