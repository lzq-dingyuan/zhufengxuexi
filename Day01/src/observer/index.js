// 把data中的数据都是用Object.defineProperty重新定义 ES5

// 不能兼容IE89以及一些  Vue2.0无法兼容
import { isObject } from '../util/index'
class Observer { 
    constructor(value) {
        // 如果vue中数据层次过多，需要递归解析对象中的属性，依次增加set和get方法  vue3.0中使用proxy来代理这个一次getset方法
        this.walk(value)
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
            console.log(newValue, 'newvalue ')
            if(newValue === value ) return;
            observe(newValue) // 继续劫持用户设置的值，因为有可能用户设置的值是一个对象
            console.log(' 之发生变化')
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