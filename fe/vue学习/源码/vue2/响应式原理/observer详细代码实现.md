# **响应式原理**-依赖注入、数据监听的实现





对源码 src/core/observer的学习：

Observer的作用就是遍历对象的所有属性将其进行数据的依赖注入、订阅发布。

observer中 为 每一个数据（value）  手动新增了一个______ob______属性，并操作 value.______ob______ = this.______ob______实际是一个 Observer 实例 这个______ob______在初始时（即 new Observer类时），就在其下面挂载了各类依赖注入、数据订阅监听等相关处理器

每个数据被附加上Observer 实例，Observer内将为目标对象加上getter\setter属性，进行依赖收集以及调度更新。

其中，数组是通过修改数组方法的原型，来新定义一个数组的操作流程（不污染原型上的方法），通过拦截处理，来实现数据的响应式处理

通过重写get set 方法 来监听数据变化的时候，进行相关系列操作

而对象 则要依次对所有属性（多层级则需要更deep的遍历）进行依赖注入，与绑定数据监听，当数据被修改时（set被执行，值更新时），dep.notify函数会通知到所有监听该数据的对象，
getter的执行里面，会进行视图的更新

###1. index.js
从 对外暴露的三个api接口入手：

####observe()
    每个被观察的对象都会被附上Observer类，observer内会将这个被观察对象的所有属性值转换到getter和setter，getter和setter会进行依赖收集以及调度更新。
    
    observer内主要包含了几个大类class

####Observer类

    constructor内部，会在最初创建时，将Observer实例绑定到data的__ob__ 
    （ 绑定方法是对当前对象执行def(value, '__ob__', this), 其核心就是使用es的 Object.defineProperty)
    1. 当value是数组时，
        （1。要重新这个数组的方法，为基本的数组操作方法添加拦截器处理，从而实现该数组数据被操作修改时，能够吧数据的变动通知发布到其订阅者，实现数据更新（array.js中实现了这个重写）
        （2。在重写时数组方法时，如果浏览器不支持__proto__这个非标准属性，则我们通过 直接覆盖原型的方法来修改目标对象；否则实现一个函数，来定义（覆盖）目标对象或数组的某一方法
        （3。执行 observeArray —— 遍历数组的每一个成员进行observe()
    2. 当value是对象,则直接walk进行绑定
        walk绑定具体是指：遍历value内的每一个对象并且在它们上面绑定getter与setter。
        绑定getter与setter操作主要通过 defineReactive 函数（为Object定一个变化时通知的属性）实现，这个函数主要的操作是：
        
        （1。也使用到来dep类 在闭包中new了一个dep对象
        （2。获取当前object 的getOwnPropertyDescriptor属性，判断是否已经拥有set，get属性，有的话则将其取出来，新定义的getter/setter中会将其执行，保证不会覆盖之前已经定义的getter/setter。
        （3。通过Object.defineProperty 为这个object绑定get，set、enumerable为true, configurable为 true,的属性
            （通过Object.getOwnPropertyDescriptor 获取该对象的属性，configurable为false的代表不是vue处理的绑定data数据监听的属性，就不继续向下执行）
            
         (4。get：：方法会return value 这个value值的获取 = getter() || val
            同时进行依赖收集——
                如果有子对象，还要对子对象进行依赖收集：childOb.dep.depend()；子对象进行依赖收集，其实就是将同一个watcher观察者实例放进了两个depend中，一个是正在本身闭包中的depend，另一个是子元素的depend
                数组对象还要遍历数组依次对内部元素进行依赖收集，如果数组的成员还是数组，则递归。
        （5。set：：绑定的set处理函数主要运行流程：
            通过getter获取当前值，与传入的新值newVal进行比较，不一致时，执行下面的操作：
                （如果原本对象拥有setter方法则执行setter，否则 对修改当前的value值，val = newVal）
                要对赋的新值再执行一次observe操作：childOb = observe(newVal) 以免丢失数据响应式
                同时，dep对象执行dep.notify()，以通知所有的观察者数据的更新


###watcher ——watcher --- 主要实现模块
一个被观察者对象的具体实现。实现的get、set函数中，封装了原生的getter、setter
用于：$watch api以及指令

主要工作：对expression进行解析、并对其进行依赖收集，在表达式数据变更时触发回调函数


    watcher的管理函数，内部主要实现了下面核心功能：
    1.queueWatcher函数：将一个观察者对象push进观察者队列，在队列中已经存在相同的id则该观察者对象将被跳过，除非它是在队列被刷新时推送
    3.对入参的表达式expOrFn解析成getter。（expOrFn若本身是是一个func，则直接赋值；为空则赋值（）=> {};其他的进行使用parsePath工具函数进行解析）
    4.constructor内处理得到的getter，主要是用于在get()执行时，来进行依赖收集
    5.依赖收集的动作执行则时依赖于 **dep**里面pushTarget（将watcher观察者实例设置给Dep.target，用以依赖收集。同时将该实例存入target栈中）
              执行了getter操作，看似执行了渲染操作，其实是执行了依赖收集。
              在将Dep.target设置为自生观察者实例以后，执行getter操作。
              譬如说现在的的data中可能有a、b、c三个数据，getter渲染需要依赖a跟c，
              那么在执行getter的时候就会触发a跟c两个数据的getter函数，
              在getter函数中即可判断Dep.target是否存在然后完成依赖收集，
              将该观察者对象放入闭包中的Dep的subs中去。
    在pushTarget操作中，传参的this是吧当前这个对象传递到dep内的，dep中对其进行处理时，会把depend(依赖收集)、addSub、notify（通知所有订阅者）等整个Dep类的方法都绑定到这个对象上
    
    6.在get中每个对象进行依赖收集时，会判断是否是deep这个参数，如果存在deep，则触发每个深层对象的依赖，追踪其变化。
    这一步的通过内部定义的一个traverse函数实现：递归每一个对象或者数组，触发它们的getter，使得对象或数组的每一个成员都被依赖收集，形成一个“深（deep）”依赖关系
    
    对象已target栈targetStack中
    
    7.执行popTarget。get中执行完pushTarget后，完成依赖收集关系的绑定后，再执行popTarget
    （将观察者实例从targetStack中取出并设置给Dep.target）为对象绑定所有观察者方法
       
    8.清理依赖收集：内部实现的cleanupDeps函数，移除之前绑定的所有观察者对象（内部定义一个depIds，来保存所有对象，数组类型，内部数据都是set类型，来保证id的绝对唯一性）
    
    9.**相关操作：
    get（初始化这个类的时候，只要没有明确设置lazy,则会进行get调用，否则会被加入调度者队列queueWatcher中）：封装了原生的getter用于数据的获取与视图的更新、pushTarget用以执行依赖的收集
    addDep：添加一个依赖关系到Deps集合中，主要内部维护newDepIds、depIds、来避免重复的依赖添加。添加依赖的动作通过dep类实现。操作dep.addSub来完成当前这个数据源的依赖田间
    cleanupDeps、：依赖dep.removeSub。遍历deps，清空newDepIds，newDeps的所有对象的依赖关系
    run（调度者工作接口，将被调度者回调）：
            通过value值是否变化，来决定是否进行这些操作：更新值、触发回掉（获取value时，执行get操作获取，get操作在获取value本身也会执行getter从而调用update更新视图）
            判断value是否变化：当前value值this.value ？== get里面获取到value值进行比较    || 当前的value是对象或者数组 || 初始化明确说明是deep属性为true的对象
           
    update（调度者接口，当依赖发生改变的时候进行回调。）：立即执行run || 通过内部维护的dirty标志位未false 执行操作缓存： queueWatcher（异步推送到观察者队列中，下一个tick时调用）
    
    evaluate（获取观察者的值）通过get接口获取。
    depend（收集该watcher的所有deps依赖）
        遍历deps内的对象， 并执行depend（dep类中的操作接口）
        
    teardown （将自身从所有依赖收集订阅列表删除）
        根据内部维护的标志位active是否未true（类建立之初就被置为true），决定执行。 遍历deps内的对象执行removeSub。执行完后标志位active置为false
    10. 相关标志位和处理函数：
        traverse： 递归每一个对象或者数组，触发它们的getter，使得对象或数组的每一个成员都被依赖收集，形成一个“深（deep）”依赖关系
        lazy 、sync 是new一个watcher的时候，接口传入的参数。控制依赖发生改变的时候，是否立刻执行回调，更新试图等。
            sync：控制 立即执行run更新视图，通知订阅者 还是 放入 queueWatcher中
            内部维护的dirty，初始化 = lazy，对于dirty为true的watcher，在触发的update操作中，依赖变化将不会自动触发订阅发布。来手动触发。或者循环执行digest cicle来执行数据更新检查的数据吗？


###dep 类 ————实现watcher之间的订阅/发布模式

主要包括：

`类中的接口函数：`
    1）订阅（添加一个观察者对象addSub）
    2）解除订阅关系（移除一个观察者对象removeSub）
    3）depend（依赖收集，当存在Dep.target的时候添加观察者对象）——依赖收集完需要将Dep.target设为null，防止后面重复添加依赖
    4）发布（通知所有订阅者 notify）

`内部维护`：Dep.target、targetStack

`外部调用接口：`
    1）pushTarget（将watcher观察者实例设置给Dep.target，用以依赖收集。同时将该实例存入target栈中）
    2）popTarget （将观察者实例从target栈中取出并设置给Dep.target）

外部主动调用类中的方法和 两个调用接口，来完成watcher到的观察者的依赖的注入、数据的联动更新、以及依赖的解除

###array.js
   这里面重写了数组的几个方法，以实现截获数组的成员发生的变化，执行原生数组操作的同时dep通知关联的所有观察者进行响应式处理

####scheduler ———— 核心对外接口：queueWatcher

```js
   1）相同id的校验判断：内部维护一个哈希表(初始是一个空对象{})：has 来确保watcher不会被重复放进队列。watcher.id就是哈希表的索引key，value为true｜null
   2）内部维护一个观察者队列：queue，存放watcher
   3）队列被刷新时执行的函数：flushSchedulerQueue
   4）flushSchedulerQueue实现思路：
    
    （1）首先 通过id大小来给队列queue排序，执行queue.sort
        通过id大小进行排序，可以保证：
            1.组件更新的顺序是从父组件到子组件的顺序，因为父组件总是比子组件先创建。
            2.一个组件的user watchers比render watcher先运行，因为user watchers往往比render watcher更早创建
            3.如果一个组件在父组件watcher运行期间被销毁，它的watcher执行将被跳过。
    （2）然后遍历queue队列，对每一个watcher执行.run()
        这里进行遍历的时候需要注意：不要先缓存队列的length，即：用index = queue.length;index > 0; index--的方式遍历。
        因为在执行处理现有watcher对象期间，更多的watcher对象可能会被push进queue
    
    （3）为了处理死循环，内部维护了一个circular对象，以watcher.id为键保存队列中每一个watcher执行run的次数，当超过 MAX_UPDATE_COUNT（内部设置为了100）时，代表可能存在死循环。将抛出异常告警
    （4）拷贝两份当前队列数据粉分别保存到activatedQueue、updatedQueue，来调用生命周期相关的钩子函数：
        1.callActivatedHooks—— 遍历queue，使子组件状态都变成active（queue[i]._inactive = true），同时调用activated钩子activateChildComponent
        2.callUpdateHooks —— 调用updated钩子（遍历queue，执行每一个watcher的updated生命周期钩子函数）
    （5）重置调度者状态resetSchedulerState。（还原所有标志位waiting、flushing 、暂存数据的变量circular={}、queue、activatedChildren置空）
   
   
   5）queueWatcher内核心实现思路是：
   	
   		Watch对象并不是立即更新视图，而是被push进了一个队列queue，此时状态处于waiting的状态，这时候会继续会有Watch对象被push进这个队列queue，等到下一个tick运行时，这些Watch对象才会被遍历取出，更新视图。同时，id重复的Watcher不会被多次加入到queue中去，因为在最终渲染时，我们只需要关心数据的最终结果。

    （1）将一个观察者对象push进queue，在queue已经存在相同的id则该观察者对象将被跳过，除非它是在队列被刷新时推送。
    （2）queue中不存在这个watcher时，先判断此时需要被flush的queue是否正在被flush，即flushSchedulerQueue正在被执行：
        若未在flush，则将当前watcher放入队列中。
        若正在flush，则在queue队列中找到该watcher（通过watcher.id ?== queue[i].id 判断）,并将其从队列中删除
     (3) 若此时flushSchedulerQueue未正在执行，则执行nextTick(flushSchedulerQueue)。		flushSchedulerQueue作为nextTick的回调函数，主要目的是执行Watcher的run函数，用来更新视图
        （nextTick实现的思路也值得学习，mark下）
```

