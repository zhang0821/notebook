[TOC]

## 父子组件生命周期顺序

    父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate 
    -> 子created -> 子beforeMount -> 子mounted -> 父mounted

## 对象【新属性】无法更新视图，【删除属性】无法更新视图，为什么？怎么办？
> 原因：Object.defineProperty没有对对象的新属性进行属性劫持
> 对象新属性无法更新视图：使用Vue.$set(obj, key, value)，组件中this.$set(obj, key, value)
> 删除属性无法更新视图：使用Vue.$delete(obj, key)，组件中this.$delete(obj, key)
  
# 为什么不建议用index做key，为什么不建议用随机数做key
    ```html
    <div v-for="(item, index) in list" :key="index">{{item.name}}</div>
    ```
    
    ```js
        list = [
            { name: '小明', id: '123' },
            { name: '小红', id: '124' },
            { name: '小花', id: '125' }
        ]
    ```
    渲染为
    ```html
    <div key="0">小明</div>
    <div key="1">小红</div>
    <div key="2">小花</div>
    ```
    现在我执行 list.unshift({ name: '小林', id: '122' }) 渲染为
    
    ```html
    <div key="0">小林</div>
    <div key="1">小明</div>
    <div key="2">小红</div>
    <div key="3">小花</div>
    ```
    
    新旧对比
    
    ```html
    <div key="0">小明</div>  <div key="0">小林</div>
    <div key="1">小红</div>  <div key="1">小明</div>
    <div key="2">小花</div>  <div key="2">小红</div>
                             <div key="3">小花</div>
    
    ```
    可以看出，如果用index做key的话，其实是更新了原有的三项，并新增了小花，虽然达到了渲染目的，但是损耗性能
    
    现在我们使用id来做key，渲染为
    
    ```html
    <div key="123">小明</div>
    <div key="124">小红</div>
    <div key="125">小花</div>
    ```
    现在我执行 list.unshift({ name: '小林', id: '122' })，渲染为
    ```html
    <div key="122">小林</div>
    <div key="123">小明</div>
    <div key="124">小红</div>
    <div key="125">小花</div>
    ```
    新旧对比
    ```html
                               <div key="122">小林</div>
    <div key="123">小明</div>  <div key="123">小明</div>
    <div key="124">小红</div>  <div key="124">小红</div>
    <div key="125">小花</div>  <div key="125">小花</div>
    ```
    可以看出，原有的三项都不变，只是新增了小林这个人，这才是最理想的结果

## 
