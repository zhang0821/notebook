###被应用的地方
当某个数据被修改的时候，set方法会让闭包中的Dep调用notify通知所有订阅者Watcher，Watcher通过get方法执行vm._update(vm._render(), hydrating)

update方法的第一个参数是一个VNode对象，在内部会将该VNode对象与之前旧的VNode对象进行__patch_

###功能思路

当oldVnode与vnode在sameVnode的时候才会进行patchVnode，也就是新旧VNode节点判定为同一节点的时候才会进行patchVnode这个过程，否则就是创建新的DOM，移除旧的DOM

patch将新老VNode节点进行比对，然后将根据两者的比较结果进行最小单位地修改视图，而不是将整个视图根据新的VNode重绘。

###patch的核心diff算法

通过`同层的树节点`进行比较`而非对树进行逐层搜索遍历`的方式，所以时间复杂度只有O(n)，是一种相当高效的算法



`patchVnode的思路：（从1-6依次判断执行）`

		1. 两个VNode节点相同则直接返回（oldVnode === vnode）
		2. 如果新旧VNode都是静态的（vnode.isStatic），同时它们的key相同（vnode.key === oldVnode.key，代表同一节点），并且新的VNode是clone（vnode.isCloned）或者是标记了once（vnode.isOnce，标记v-once属性，只渲染一次），那么只需要替换elm以及componentInstance即可：
		vnode.elm = oldVnode.elm
	vnode.componentInstance = oldVnode.componentInstance
		然后 return
		3. 新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren，这个updateChildren也是diff的核心。
		4. 如果老节点没有子节点而新节点存在子节点，先清空老节点DOM的文本内容，然后为当前DOM节点加入子节点。
		5. 当新节点没有子节点而老节点有子节点的时候，则移除该DOM节点的所有子节点。
		6. 当新老节点都无子节点的时候，只是文本的替换。

`updateChildren思路：`


![img](https://i.loli.net/2017/08/28/59a4015bb2765.png)

    首先，在新老两个VNode节点的左右头尾两侧都有一个变量标记，在遍历过程中这几个变量都会向中间靠拢。当oldStartIdx > oldEndIdx或者newStartIdx > newEndIdx时结束循环。
    
    索引与VNode节点的对应关系：
    oldStartIdx => oldStartVnode
    oldEndIdx => oldEndVnode
    newStartIdx => newStartVnode
    newEndIdx => newEndVnode

在遍历中，如果存在key，并且满足sameVnode，会将该DOM节点进行复用，否则则会创建一个新的DOM节点。

    首先，oldStartVnode、oldEndVnode与newStartVnode、newEndVnode两两比较一共有2*2=4种比较方法。
    
    当新老VNode节点的start或者end满足sameVnode时，也就是sameVnode(oldStartVnode, newStartVnode)或者sameVnode(oldEndVnode, newEndVnode)，直接将该VNode节点进行patchVnode即可。

![img](https://i.loli.net/2017/08/28/59a40c12c1655.png)

    如果oldStartVnode与newEndVnode满足sameVnode，即sameVnode(oldStartVnode, newEndVnode)。
    
    这时候说明oldStartVnode已经跑到了oldEndVnode后面去了，进行patchVnode的同时还需要将真实DOM节点移动到oldEndVnode的后面。

![img](https://ooo.0o0.ooo/2017/08/28/59a4214784979.png)

    如果oldEndVnode与newStartVnode满足sameVnode，即sameVnode(oldEndVnode, newStartVnode)。
    
    这说明oldEndVnode跑到了oldStartVnode的前面，进行patchVnode的同时真实的DOM节点移动到了oldStartVnode的前面。

![img](https://i.loli.net/2017/08/29/59a4c70685d12.png)

		如果以上情况均不符合，则通过createKeyToOldIdx会得到一个oldKeyToIdx，里面存放了一个key为旧的VNode，value为对应index序列的哈希表。从这个哈希表中可以找到是否有与newStartVnode一致key的旧的VNode节点，如果同时满足sameVnode，patchVnode的同时会将这个真实DOM（elmToMove）移动到oldStartVnode对应的真实DOM的前面。

![img](https://i.loli.net/2017/08/29/59a4d7552d299.png)

		当然也有可能newStartVnode在旧的VNode节点找不到一致的key，或者是即便key相同却不是sameVnode，这个时候会调用createElm创建一个新的DOM节点。

![img](https://i.loli.net/2017/08/29/59a4de0fa4dba.png)

到这里循环已经结束了，那么剩下我们还需要处理多余或者不够的真实DOM节点。

		1.当结束时oldStartIdx > oldEndIdx，这个时候老的VNode节点已经遍历完了，但是新的节点还没有。说明了新的VNode节点实际上比老的VNode节点多，也就是比真实DOM多，需要将剩下的（也就是新增的）VNode节点插入到真实DOM节点中去，此时调用addVnodes（批量调用createElm的接口将这些节点加入到真实DOM中去）。

![img](https://i.loli.net/2017/08/29/59a509f0d1788.png)

		2。同理，当newStartIdx > newEndIdx时，新的VNode节点已经遍历完了，但是老的节点还有剩余，说明真实DOM节点多余了，需要从文档中删除，这时候调用removeVnodes将这些多余的真实DOM删除。

![img](https://i.loli.net/2017/08/29/59a4f389b98cb.png)


###主要参数：

`nodeOps`

可以操作真实节点的一个接口（vue内部已经做了适配：platforms/web(weex)/runtime/node-ops.js）

`modules`

封装的页面属性等的操作
		attrs，klass，events，style，transition
		
###Vue使用的虚拟DOM如何映射到真实的DOM节点上呢？

Vue为平台做了一层适配层，不同平台之间通过适配层对外提供相同的接口，虚拟DOM进行操作真实DOM节点的时候，只需要调用这些适配层的接口（nodeOps）即可，而内部实现则不需要关心，它会根据平台的改变而改变。
现在又出现了一个问题，我们只是将虚拟DOM映射成了真实的DOM。那如何给这些DOM加入attr、class、style等DOM属性呢？

这要依赖于虚拟DOM的生命钩子。虚拟DOM提供了如下的钩子函数，
```javascript
hooks = ['create', 'activate', 'update', 'remove', 'destroy']
```
分别在不同的时期会进行调用。

为这些操作构建绑定cbs回调函数内部要处理的页面属性更新、渲染等等操作。

  ```javascript

	for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }
  ```