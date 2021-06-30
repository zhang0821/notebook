[TOC]

## 多行溢出

// 单行文本出现省略号 & 多行文本出现省略号
```css

.single {
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
}
    

.multiple {
    display: -webkit-box; /*重点，不能用block等其他，将对象作为弹性伸缩盒子模型显示*/
    -webkit-box-orient: vertical; /*从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）*/
    -webkit-line-clamp: 3; /*行数，超出三行隐藏且多余的用省略号表示...*/
    line-clamp: 3;
    word-break: break-all;
    overflow: hidden;
    max-width: 100%;
}


```

## 隐藏文本的常用两种方法
```css
.hidden {
    text-indent: -9999px; 
}
```
or 

```css
.hidden {
    font-size: 0;
}
```
## 层叠上下文
### 触发条件

    根层叠上下文(html)
    position
    css3属性
        flex
        transform
        opacity
        filter
        will-change
        -webkit-overflow-scrolling

    层叠等级：层叠上下文在z轴上的排序
    在同一层叠上下文中，层叠等级才有意义
    z-index的优先级最高
### example
```html
<div class="test">
	<div class="normal item"></div>
	<div class="item in-line"></div>
</div>
<style>
    .item {
        width: 100px;
        height: 50px;
    }
    .normal {
    /* 使得自身的z-index层级值变大	 */
    /* 	opacity: 0.9; */
        transform: translateY(10px);
        background: blue;
    }
    .in-line {
        margin-top: -10px;
        display: inline-block;
        background: green;
    }
</style>
```

## 去除浮动影响，防止父级高度塌陷
- 通过增加尾元素清除浮动——`:after`, `/<br>` ,`:clear`, `: both`
- 创建父级 BFC
- 父级设置高度

## 给圆形（用户头像）设置阴影
```css
.avatar-shadow {
	position: relative;
	border-radius: 100%;
	width: 200px;
	height: 200px;
	background: url('https://static.yangzw.vip/codepen/thor.jpg') no-repeat center/cover;
}
.avatar-shadow::after {
		position: absolute;
		left: 10px;
		top: 10%;
		z-index: -1;
		border-radius: 100%;
		width: 100%;
		height: 100%;
		background: red;
		filter: blur(10px) brightness(80%) opacity(.8);
		content: "";
		transform: scale(.95);
	}
```
