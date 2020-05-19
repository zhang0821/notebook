###vnode思路
把真实DOM树抽象成一棵以JavaScript对象构成的抽象树，在修改抽象树数据后将抽象树转化成真实DOM重绘到页面。
它是真实DOM的一层抽象，用属性描述真实DOM的各个特性。当它发生变化的时候，就会去修改视图。

可以想象，最简单粗暴的方法就是将整个DOM结构用innerHTML修改到页面上，但是这样进行重绘整个视图层是相当消耗性能的。
Vue.js将DOM抽象成一个以JavaScript对象为节点的虚拟DOM树，以VNode节点模拟真实DOM，可以对这颗抽象树进行创建节点、删除节点以及修改节点等操作，在这过程中都不需要操作真实DOM，只需要操作JavaScript对象后只对差异修改，相对于整块的innerHTML的粗暴式修改，大大提升了性能。
修改以后经过diff算法得出一些需要修改的最小单位，再将这些小单位的视图进行更新。这样做减少了很多不需要的DOM操作，大大提高了性能。

###实现
#### 最基础的VNode节点，作为其他派生VNode类的基类
基类中初始化参量：记录当前节点的相关信息。eg：

    tag: 当前节点的标签名
    data: 当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息
    children: 当前节点的子节点，是一个数组
    text: 当前节点的文本
    elm: 当前虚拟节点对应的真实dom节点
    ns: 当前节点的名字空间
    context: 当前节点的编译作用域
    functionalContext: 函数化组件作用域
    key: 节点的key属性，被当作节点的标志，用以优化
    componentOptions: 组件的option选项
    componentInstance: 当前节点对应的组件的实例
    parent: 当前节点的父节点
    raw: 简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false
    isStatic: 是否为静态节点
    isRootInsert: 是否作为跟节点插入
    isComment: 是否为注释节点
    isCloned: 是否为克隆节点
    isOnce: 是否有v-once指令


#### VNode相关的一些工具函数patch.js
`sameVnode`: 两个VNode节点是否是同一个节点
		
		 key相同、tag（当前节点的标签名）相同、isComment（是否为注释节点）相同
	是否data（当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息）都有定义
	当标签是<input>的时候，type必须相同

`createKeyToOldIdx`: 生成一个key与旧VNode的key对应的哈希表
		

		比如childre是这样的：
	[{xx: xx, key: 'key0'}, {xx: xx, key: 'key1'}, {xx: xx, key: 'key2'}]  beginIdx = 0   endIdx = 2  
  	结果生成{key0: 0, key1: 1, key2: 2}

**`createPatchFunction`**: **创建patch方法**

返回值： 一个patch函数



#### 基于基类的创建一个新VNode的方法



三个较简单的方法：

```javascript
new VNode()
```

`创建一个文本节点`：createTextVNode
`创建一个空节点`：createEmptyVNode
`克隆一个VNode节点`: cloneVNode



 `创建一个组件节点`：patch.js/createComponent

 `创建虚拟节点`: _createElement 用来创建一个虚拟节点。

入参：context、tag、data、children、normalizationType（number，对应指代针对children的处理方式）

		1. 当data未定义（undefined或者null），或者data上已经绑定__ob__属性时，代表该对象已经被Obervered，上面绑定了Oberver对象，创建一个空节点。
		2. tag不存在的时候，同样创建一个空节点。
		3. 当tag不是一个String类型的时候代表tag是一个组件的构造类，直接用new VNode创建。
			当tag是String类型的时候：
				如果是保留标签，则用new VNode创建一个VNode实例，创建一个相应节点（利用config.parsePlatformTagName(tag)）
				如果在vm的option的components找得到该tag，代表这是一个组件；vnode = createComponent(Ctor, data, context, children, tag)
				否则统一用new VNode创建。
		4. tag不是字符串的时候则是组件的构造类： vnode = createComponent(tag, data, context, children)
		
		5. 如果vnode创建成功（isDef(vnode)）， return vnode。（同时需要先递归使子节点应用同一当前名字空间ns）
		6. 为创建成功，返回一个创建的空节点：createEmptyVNode()

`createElement`: