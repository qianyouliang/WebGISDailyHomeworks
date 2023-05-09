1. 响应式
		1. VUE 观测的数据改变了 (响应式)，视图也会同步变化 （依赖收集和触发）（批量更新机制）
2. 虚拟 DOM
	1. vue 渲染模板的时候会根据模板中的数据生成一个虚拟的 DOM 1 (就是一个 JS 对象)，再根据虚拟 DOM 1 生成真实 DOM 1，当数据变化的时候，再生成一个虚拟 DOM 2，vue 会比对虚拟 DOM 2 和虚拟 DOM 1，计算出其中变化的部分，然后将变化部分重新渲染成对应的真实 DOM 2，不变的部分继续使用
# Vue3中的组合式API[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#vue3%E4%B8%AD%E7%9A%84%E7%BB%84%E5%90%88%E5%BC%8Fapi)

## 学习目标[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#%E5%AD%A6%E4%B9%A0%E7%9B%AE%E6%A0%87)

-   【了解】Vue3简介
-   【掌握】Vite构建Vue3项目
-   【掌握】组合式API的基本使用
-   【掌握】组合式API中的响应式数据
-   【掌握】组合式API中的计算属性和监听属性
-   【掌握】组合式API中的生命周期

之前我们学习的基础语法都是基于Vue2版本的，并且Vue2版本会继续作为主流版本流行于市场开发中，但是Vue3版本已经升级为了Vue的默认版本，新版本的特性和优化进一步提高了开发效率，所以接下来的课程，我们来一起学习Vue3版本中的一些变化和新特性，不用担心，之前学习的绝大多数内容在Vue3版本中可以继续使用，我们课程的关注点在其中变化的部分。

## 1.Vue3简介[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_1-vue3%E7%AE%80%E4%BB%8B)

![p9Ewun0.png](https://s1.ax1x.com/2023/04/21/p9Ewun0.png)

-   2020年9月18日，Vue.js发布3.0版本，代号：One Piece（海贼王）
-   耗时2年多、[2600+次提交](https://github.com/vuejs/vue-next/graphs/commit-activity)、[30+个RFC](https://github.com/vuejs/rfcs/tree/master/active-rfcs)、[600+次PR](https://github.com/vuejs/vue-next/pulls?q=is%3Apr+is%3Amerged+-author%3Aapp%2Fdependabot-preview+)、[99位贡献者](https://github.com/vuejs/vue-next/graphs/contributors)
-   github上的tags地址：[https://github.com/vuejs/vue-next/releases/tag/v3.0.0](https://github.com/vuejs/vue-next/releases/tag/v3.0.0)

Vue3从发布到今天快要接近2年，针对于Vue2版本，做了相当多的优化和升级：

#### 1.1 性能提升[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_1-1-%E6%80%A7%E8%83%BD%E6%8F%90%E5%8D%87)

-   打包大小减少41%
    
-   初次渲染快55%, 更新渲染快133%
    
-   内存减少54%
    
    ......
    

#### 1.2 源码重构[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_1-2-%E6%BA%90%E7%A0%81%E9%87%8D%E6%9E%84)

-   使用Proxy代替defineProperty实现响应式
    
-   重写虚拟DOM的实现和Tree-Shaking
    
    ......
    

#### 1.3 全新特性[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_1-3-%E5%85%A8%E6%96%B0%E7%89%B9%E6%80%A7)

-   Composition API（组合API）
    
    -   setup配置
    -   ref与reactive
    -   watch与watchEffect
    -   provide与inject
    -   ......
-   新的内置组件
    
    -   Fragment
    -   Teleport
    -   Suspense
-   其他改变
    
    -   新的生命周期钩子
    -   data 选项应始终被声明为一个函数
    -   移除keyCode支持作为 v-on 的修饰符
    -   ......

#### 1.4 支持TypeScript[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_1-4-%E6%94%AF%E6%8C%81typescript)

-   Vue3可以更好的支持TypeScript

我们要学习的重点就在于其中的全新特性部分，当然随着你的能力逐步提高，阅读源码和性能分析也是后面的必修课。

## 2.Vite[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_2-vite)

正式学习语法之前，需要构建一下我们的项目，在之前的课程中我们利用Vue-CLI来构建项目，在Vue3中你仍然可以这么做，这里给大家介绍一个新的工具Vite，它构建项目的速度比Vue-CLI要更加快捷。

使用命令来创建项目：

```
npm init vite@latest
```

选择创建Vue项目后，进入项目目录安装依赖：

```
npm instanll
```

成功后也会生成对应的项目目录，和Vue-CLI的目录结构基本一致，相信大家不会陌生。

输入命令来启动项目：

```
npm run dev
```

大家应该能明显感觉到启动速度变得飞快，看到启动页说明项目已经运行在了开发环境中：

在Vue3中，构建项目的语法有所改变，所以我们将项目的入口文件(src/main.js)来单独分析一下

js

```
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

如果有印象，这和Vue2中的入口文件是不同的，可以对比再看一下

js

```
//vue2的入口文件
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
```

在Vue3中，通过构造函数创造实例的方式做了修改，变成了利用工厂函数createApp来创建，Vue3遵从函数式编程思想，任何方法都需要手动引入。

## 3.组合式API[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_3-%E7%BB%84%E5%90%88%E5%BC%8Fapi)

在Vue2中，我们绝大部分逻辑代码都写在配置选项中，数据放到data中，方法放到methods中，请求发送放到mounted中，这种做法看起来很"合理"，在存在一个很大问题，它将逻辑割裂了，例如要完成一个A功能，希望能将实现这个功能的所有代码集合在一起，然后完成B功能，再将B功能的代码集合到一起，显然之前的配置选项API让一切变得有点混乱，于是在Vue3中，选项式API进化成了组合式API，这也是Vue3新特性的重点。

-   使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改 。
    
-   在组合式CompositionAPI中，我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。
    

## 4.setup() 入口[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_4-setup-%E5%85%A5%E5%8F%A3)

setup可以理解为一个入口，之前的data,methods,watch,computed,生命周期函数等等最常见的逻辑代码都会放到这个函数中来编写。先来编写一个简单的示例，再来总结一下setup的使用规则。

在根实例App.vue中完成一个简单的点击按钮 数字自增1的效果：

vue

```
<template>
  <button @click="add">{{ count }}</button>
</template>

<script>
  import { ref } from 'vue'
  export default {
    setup() {
      let count = ref(1)
      let add = () => {
        count.value++
      }
      return {
        count,
        add,
      }
    },
  }
</script>
<style>
</style>
```

比较一下Vue3和Vue2中的语法区别，可以总结出来setup的一些语法要求:

-   setup可以理解为Vue3.0中一个新的配置项，值为一个函数(后面还有更优的写法)。
    
-   组件中所用到的：数据、方法、计算属性、监听属性等等，均要配置在setup中。
    
-   setup返回的对象可以直接用来视图模板中(Vue3中需要忘记this)。
    
-   Vue3仍然可以兼容Vue2的语法，但不要这么做。
    

## 5.响应式数据[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_5-%E5%93%8D%E5%BA%94%E5%BC%8F%E6%95%B0%E6%8D%AE)

#### 5.1 ref[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_5-1-ref)

在刚才的示例中，有这么一行代码需要单独说明：

js

```
let count = ref(1)
```

你可以理解这样做就相当于在data中定义了一个count，初始值为1。

ref是Vue3中的一个方法，如果要使用需要引入它。所以在Vue3中，如果希望一个数据具有响应式，必须手动调用方法来实现，可能很多同学会觉得这样还不如Vue2的data配置项，其实不然，实现数据的响应式是需要消耗性能的，如果有些数据仅仅是做静态展示，并不需要改变，添加上响应式其实是没意义的，Vue3中将这项权利交给了开发者，毫无疑问是一个进步。

我们再看一下上面示例中的一行代码，它是用来更改count数据的：

js

```
let add = () => {
    count.value++
  }
```

如果希望更改通过ref定义的响应式数据，必须通过`.value`的形式来访问，至于在模板中可以直接使用。

#### 5.2 reactive[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_5-2-reactive)

用ref定义的响应式数据必须通过`.value`的形式才能访问，reactive正好解决了这个问题，reactive同样是Vue提供的用来定义响应式数据的方法，但需要注意，它只能定义引用数据类型。

vue

```
<template>
  <p>{{ person.name }}</p>
  <p>{{ person.age }}</p>
  <p><button @click="add2">点我年纪加一</button></p>
</template>

<script>
  import { reactive,} from 'vue'
  export default {
    setup() {
      let person = reactive({
        name: '张三',
        age: 18,
      })
      let add2 = () => {
        person.age++
      }
      return {
        person,
        add2,
      }
    },
  }
</script>

<style></style>
```

#### 5.3 ref和reactive的比较[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_5-3-ref%E5%92%8Creactive%E7%9A%84%E6%AF%94%E8%BE%83)

-   ref和reactive都是用来定义响应式数据的方法
-   ref既可以定义基本数据，也可以定义引用数据
-   reactive只能定义引用数据
-   ref定义的数据在setup中需要通过`.value`来进行操作，在模板中可以直接访问
-   reactive定义的数据可以直接操作和访问。

## 6.props和自定义事件[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_6-props%E5%92%8C%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6)

了解了如何实现响应式数据之后，很多同学会有疑问，Vue3中如何实现组件通信呢？换言之，props和之前的`this.$emit`去哪了呢？现在一起来研究这个问题：

现在父组件给子组件传递一些数据，并且希望子组件中的按钮能触发父组件中的数据自增，这是一个父子通信的典型场景，显然需要利用props和自定义事件，Vue3中是如何做的呢？

vue

```
//父组件中 组件的使用流程和Vue2中保持一致 仍然需要引用注册使用
<template>
  <Child @add-count="count++" :msg="msg" />
  <p>{{ count }}</p>
</template>

<script>
  import { ref } from 'vue'
  import Child from './components/Child.vue'
  export default {
    setup() {
      let count = ref(1)
      let msg = ref('这是传递给子组件的信息')
      return {
        count,
        msg,
      }
    },
    components: {
      Child,
    },
  }
</script>
<style></style>
```

vue

```
//子组件中
<template>
  <p>{{ props.msg }}</p>
  <button @click="add">点我父组件加一</button>
</template>

<script>
  export default {
    props: ['msg'],
    emits: ['add-count'],//Vue3中需要接受自定义事件 这是和Vue2的显著区别
    setup(props, ctx) {
      const add = () => {
        ctx.emit('add-count')
      }
      return {
        props,
        add,
      }
    },
  }
</script>

<style></style>
```

setup会接受2个参数，第一个即是父组件传递过来的props对象，第二个参数可以理解为一个上下文对象，这个对象中包含了触发自定义事件的emit方法。当然，仍然需要用选项的形式来接受传递过来的属性和自定义事件。

## 7.计算属性[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_7-%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)

在Vue3中计算属性变成了一个setup入口中的函数来使用。回忆一下我们之前写过的姓名案例，在Vue3中应该这样来实现：

js

```
import {computed} from 'vue'

setup(){
    ...
	//计算属性——简写
    let fullName = computed(()=>{
        return person.firstName + '-' + person.lastName
    })
    //计算属性——完整
    let fullName = computed({
        get(){
            return person.firstName + '-' + person.lastName
        },
        set(value){
            const nameArr = value.split('-')
            person.firstName = nameArr[0]
            person.lastName = nameArr[1]
        }
    })
}
```

## 8.侦听属性[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_8-%E4%BE%A6%E5%90%AC%E5%B1%9E%E6%80%A7)

和计算属性类似，侦听属性也变成了一个函数，第一个参数是需要监听的数据，第二个参数是变化时执行的函数。

vue

```
<template>
  <button @click="count++">{{ count }}</button>
  <h2>{{ text }}</h2>
</template>

<script>
  import { ref, watch } from 'vue'
  export default {
    setup() {
      let count = ref(0)
      let text = ref('偶数')
      watch(count, () => {
        if (count.value % 2 === 0) {
          text.value = '偶数'
        } else {
          text.value = '奇数'
        }
      })
      return {
        count,
        text,
      }
    },
  }
</script>

<style></style>
```

## 9 生命周期[​](http://web-2-doc.x-zd.net/vue3/vue3-api.html#_9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)

Vue3中的生命周期一般都直接写在setup入口当中，其中销毁阶段的生命周期名称做了一些修改，而setup本身也可以理解为创建阶段的生命周期，Vue3中的生命周期和Vue2的对应关系如下：

-   `beforeCreate`===>`setup()`
-   `created`=======>`setup()`
-   `beforeMount` ===>`onBeforeMount`
-   `mounted`=======>`onMounted`
-   `beforeUpdate`===>`onBeforeUpdate`
-   `updated` =======>`onUpdated`
-   `beforeDestroy` ==>`onBeforeUnmount`
-   `destroyed` =====>`onUnmounted`

vue

```
<script>
  import { onMounted } from 'vue'
  export default {
    setup() {
     	onMounted(()=>{
            发送一个请求
		})
    },
  }
</script>
```