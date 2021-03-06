[toc]
# 课程准备
课程源码地址：https://github.com/DuYi-Edu/DuYi-VUE
谷歌 插件 vue-devtools

# 开始使用
1、引入vue.js
    官网：Vuejs.org
    开发版本：包含完整的警告和调试模式
    生产版本：删除了警告，体积更小
2、引入vue.js后，给我们提供了一个构造函数Vue
3、在js中，new Vue()
4、new Vue()后会返回一个vue实例对象，我们用变量接着它
5、const vm = new Vue();
6、传递一个配置对象{}   -->   const vm = new Vue({});
## el
类型：字符串
全称：element(元素)
作用：配置控制的元素，表示Vue要控制的区域，值为css选择器
<!-- 被控制的区域 专业名称：模板 -->
    <div id="app"></div>
    const vm = new Vue({
        el: '#app', // 控制id为app的区域
    })
## $mount
· 作用和el一致，都是配置控制的元素，使用哪个都可以，二选一

    <div id="app"></div>
    const vm = new Vue({});
    vm.$mount('#app');
### el和$mount的区别？
    本质上没什么区别，$mount为手动挂载，在项目中有时要进行延迟挂载，比如有时要在挂载之前进行一些其他的操作，比如判断等等(当然这种做法的时候很少)
## data
· 类型：对象
· 作用：存放要用到的数据，数据为响应式的
    const vm = new Vue({
        el: '#app', // 控制id为app的区域
        data: {
            'msg': '存放的信息'
        }
    })
## 插值表达式
· 使用方法：{{  }}
· 可以将vue中的数据填在插值表达式中，如：

    <div id="app">
        {{ msg }}
        {{ 5201314 }}
        {{ '婀娜多姿，亭亭玉立' }}
        {{ true }}
        {{ ['等', '不得'] }}
        {{ {'name': 'jerry', 'age': 18} }}
        {{ 2+3 }} <!-- 运算表达式 -->
        {{ !0 }} <!-- 逻辑表达式 -->
        {{ 1>2?0:3 }} <!-- 三元表达式 -->
        {{ mrDeng.father }}  <!-- 不会报错，但是值为undefined -->
    </div>
    const vm = new Vue({
        el: '#app',
        data: {
            msg: '在控制区域存放数据信息',
        }
    });
    补充：插值表达式 可以写数字、字符串、boolean、array、object、表达式、已经声明的数据，否则会报错、undefined、null
# Vue的响应式-1
- 数据变化，页面就会重新渲染(但是未经声明的和未使用的数据发生变化，不会重新渲染页面)，但是数据变化后，页面不会立刻重新渲染，因为页面渲染的操作是异步执行的
拿到渲染之后页面DOM元素，借助下面两个方法
- vm.$nextTick() this --> vue实例
- Vue.nextTick() this --> window
```js
if(typeof Promise !== 'undefined') {

} else if (typeof MutationObserver !== 'undefined') {

} else if (typeof setImmediate !== 'undefined') {
    
} else {
    // setTimeout
}
```
- Promise.resolve().then() 微
- MutationObserver 突变观察 假节点 改动 微
- setImmediate 宏任务 0IE下
- setTimeout 宏任务

- 曾今vue用过的宏任务
    - MessageChannel 消息通道 宏任务
# Vue的响应式-2
1. 数组
    > 通过索引的方式更改数组
    > 更改长度
2. 对象
    > 增删对象
使用上面的方法修改数据，是不会重新渲染页面，只有用下面的才会重新渲染

- 数组
    1、变异方法：push、pop、shift、unshift、splice、sort、reverse
    2、vm.$set(要改谁, 改什么, 改成什么) 或者 Vue.set(要改谁, 改什么, 改成什么)
    3、vm.$delete(要删谁，删什么) 或者 Vue.delete(要删谁，删什么)
- 对象
    1、vm.$set(要改谁, 改什么, 改成什么) 或者 Vue.set(要改谁, 改什么, 改成什么)
    2、vm.$delete(要删谁，删什么) 或者 Vue.delete(要删谁，删什么)

- 数据劫持: Object.defineProperty
