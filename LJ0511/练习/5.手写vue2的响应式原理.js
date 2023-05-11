/* 
    vue2的响应式原理:
        1.需要递归观测整个data对象
        2.data对象内部可能存在多种数据类型(普通对象 数组)
            2.1对象 通过Object.defineProperty实现对每个属性的劫持
            2.2数组 通过重写数组的方法实现对数组的劫持，又能实现视图的更新
*/

import {newArrayPrototype} from './7.newArrayPrototype.js'
function observe(data){
    //data可以是对象(必须是vue2中的根组件)
    data = typeof data === 'function' ? data() : data;
    if(typeof data !== 'object' || data === null) return
    //判断是对象还是数组
    if(Array.isArray(data)){
        //重写数组的方法实现响应式
        //还需要对数组中的元素进行递归观测
        observeArray(data)
        data.observeArray = observeArray
        data.__proto__ = newArrayPrototype
    }else{
        walk(data)
    }
}

function walk(data){
    Object.keys(data).forEach(key =>{
        //第二步 给每个data中的key值添加一个响应式方法
        defineReactive(data,key,data[key])
    })
}

function defineReactive(data,key,value){
    Object.defineProperty(data,key,{
        get(){
            return value
        },
        set(newValue){
            if(newValue === value) return
            observe(newValue)//修改后的数据也要进行观测
            value = newValue//改动数据
            //通知试图更新
            console.log('视图要更新了');
        }
    })
}

function observeArray(data){
    data.forEach(item => {
        observe(item)
    })
}


let data = {
    info:{
        name:'zhangsan',
        age:20,
        msg:{
            gender:1
        }
    },
    list:[{number:1},{number:2},{number:3}]
    
}
observe(data)
/* data.list[0].number = 100 */
data.list.push({number:4})
console.log(data.list); 
data.list[3].number = 100
