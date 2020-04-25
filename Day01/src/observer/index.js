// 把data中的数据都是用Object.defineProperty重新定义 ES5

// 不能兼容IE89以及一些  Vue2.0无法兼容
import {arrayMethods } from './array.js'
import { isObject, def } from '../util/index'
class Observer { 
    constructor(value) {
        // 如果vue中数据层次过多，需要递归解析对象中的属性，依次增加set和get方法  vue3.0中使用proxy来代理这个一次getset方法
        // value.__ob__ = this; // 给每一个监控的对象都增加一个属性
        def(value, '__ob__', this)
        if(Array.isArray(value)){ // 如果是数组的话，不会对索引进行观测，因为会导致性能问题
            // 前端中开发很少会去操作索引 比如  push shift  unshift
            console.log(12344325423, '')
            value.__proto__ = arrayMethods
            // 如果数组中放的是对象我在监控
            this.observerArray(value)

        }else{
            this.walk(value)
        }
    }

    observerArray(value){ 
        for(let i = 0; i< value.length; i++){
            console.log(value[i])
            observe(value[i])
        }
    }
    walk(data){
        let keys = Object.keys(data); // [name, age, address]
        keys.forEach((key, index) =>{
            defineReactive(data, key, data[key])
        })
        // for(let i = 0; i <keys.length; i++){
        //     let key = keys[i];
        //     let value = data[key];
        //     defineReactive(data, key, value)  // 定义响应式数据
        // }
    }
}

function defineReactive(data, key, value ){
    observe(value)  // 递归实现深度检测  提示
    Object.defineProperty(data, key, {
        get(){
            return value
        },
        set(newValue){
            console.log(newValue, '更新数据')
            if(newValue === value ) return;
            observe(newValue) // 继续劫持用户设置的值，因为有可能用户设置的值是一个对象
            value = newValue;
        }
    })
}

export function observe(data){
    let isObj = isObject(data)
    if(!isObj){
        return 
    }
    return new Observer(data);  // 用来观测数据
}