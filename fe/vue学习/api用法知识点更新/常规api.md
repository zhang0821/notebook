# Vue-api 用法知识点更新



1. [**在** v-for **里使用对象**](https://cn.vuejs.org/v2/guide/list.html#在-v-for-里使用对象)
2. . **指令 ：**[**动态参数**](https://cn.vuejs.org/v2/guide/syntax.html#动态参数)**、**[**修饰符**](https://cn.vuejs.org/v2/guide/syntax.html#修饰符)**、**[**计算属性的 setter**](https://cn.vuejs.org/v2/guide/computed.html#计算属性的-setter)
3. . [**在** v-for **里使用值范围**](https://cn.vuejs.org/v2/guide/list.html#在-v-for-里使用值范围) **eg: v-for=“n in 10”**
4. [**事件修饰符**](https://cn.vuejs.org/v2/guide/events.html#事件修饰符)  

<img src="/Users/zhangli45/Library/Application Support/typora-user-images/image-20200512101441591.png" alt="image-20200512101441591" style="zoom:50%;" />

5.  [**按键修饰符**](https://cn.vuejs.org/v2/guide/events.html#按键修饰符)**、**[.exact **修饰符**](https://cn.vuejs.org/v2/guide/events.html#exact-修饰符)
2. **表单动态双向绑定的修饰符：** [**修饰符**](https://cn.vuejs.org/v2/guide/forms.html#修饰符)
3. **Prop的双向绑定，（1）显示的在使用子组件时通过函数触发一个update事件，来将新值传递给父组件，父组件内部在喊出处理时来显示的修改参数（2）使用** [.sync **修饰符**](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-修饰符)
4. 插槽： 普通、具名插槽、作用域插槽（让插槽内容能够访问子组件中才有的数据）：[**作用域插槽**](https://cn.vuejs.org/v2/guide/components-slots.html#作用域插槽)**、**[**独占默认插槽的缩写语法**](https://cn.vuejs.org/v2/guide/components-slots.html#独占默认插槽的缩写语法)**、**[**解构插槽 Prop**](https://cn.vuejs.org/v2/guide/components-slots.html#解构插槽-Prop)**、**[**动态插槽名**](https://cn.vuejs.org/v2/guide/components-slots.html#动态插槽名)**、**[**具名插槽的缩写**](https://cn.vuejs.org/v2/guide/components-slots.html#具名插槽的缩写)
9.  保持组件的状态： [**在动态组件上使用** keep-alive](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#在动态组件上使用-keep-alive)

<img src="/Users/zhangli45/Library/Application Support/typora-user-images/image-20200512101733662.png" alt="image-20200512101733662" style="zoom:50%;" />

10.  [**异步组件**](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#异步组件)

[**处理加载状态**](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#处理加载状态)

<img src="/Users/zhangli45/Library/Application Support/typora-user-images/image-20200512101713745.png" alt="image-20200512101713745" style="zoom:50%;" />

###⚠️



**1.**[**依赖注入**](https://cn.vuejs.org/v2/guide/components-edge-cases.html#依赖注入)

**父组件内：provide，显示说明哪些数据可以被子组件使用**

<img src="/Users/zhangli45/Library/Application Support/typora-user-images/image-20200512101854570.png" alt="image-20200512101854570" style="zoom:50%;" />

 **子组件中：使用inject，引入父组件的数据**

<img src="/Users/zhangli45/Library/Application Support/typora-user-images/image-20200512101918689.png" alt="image-20200512101918689" style="zoom:50%;" />

**从而使无论层级多深的子组件 都可以向上访问到父组件暴露出的数据**



**需要注意：** 所提供的 property 是非响应式的



1. [**程序化的事件侦听器**](https://cn.vuejs.org/v2/guide/components-edge-cases.html#程序化的事件侦听器)**（$on,$once,$off）**
2. **模版编写：**[**内联模板**](https://cn.vuejs.org/v2/guide/components-edge-cases.html#内联模板)**、**[**X-Template**](https://cn.vuejs.org/v2/guide/components-edge-cases.html#X-Template)
3. **组件的进入/离开 & 列表过渡——**[**单元素/组件的过渡**](https://cn.vuejs.org/v2/guide/transitions.html#单元素-组件的过渡)

<img src="/Users/zhangli45/Library/Application Support/typora-user-images/image-20200512101946584.png" alt="image-20200512101946584" style="zoom:50%;" />

[**过渡的类名**](https://cn.vuejs.org/v2/guide/transitions.html#过渡的类名)**： 6类class名**

[**JavaScript 钩子**](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-钩子)

<img src="/Users/zhangli45/Library/Application Support/typora-user-images/image-20200512102016233.png" alt="image-20200512102016233" style="zoom:50%;" />

⚠️ 混入（mixin）、 、[**全局混入**](https://cn.vuejs.org/v2/guide/mixins.html#全局混入)**、、、**



⚠️ 自定义指令 

​	全局自定义指令、局部组件的自定义指令

<img src="/Users/zhangli45/Library/Application Support/typora-user-images/image-20200512102045573.png" alt="image-20200512102045573" style="zoom:50%;" />

指令定义对象： [**钩子函数**](https://cn.vuejs.org/v2/guide/custom-directive.html#钩子函数)：**bind**、**insert**、**update**、**componentUpdated**、**unbind**