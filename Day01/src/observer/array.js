// 我要重写数组的哪些方法  7个push shift unshift pop reverse sort splice 会导致数组本身发生变化 
// slice()不会变原生数组
let oldArrayMethods = Array.prototype;
// value.__propto__ = arrayMethods 原型链查找问题，向上查找，先查找重写的，没有会继续向上查找
// arrayMethods.__propto__ = oldArrayMethods
export let arrayMethods = Object.create(oldArrayMethods);
const methods = [
    'push',
    'shift',
    'unshift',
    'pop',
    'sort',
    'splice',
    'reverse'
]

methods.forEach(method =>{
    arrayMethods[method] = function (...args){
        console.log('用户掉了puysh方法') // AOP 切片编程
        const result = oldArrayMethods[method].apply(this, args); // 调用了原生的数组方法
        // push  unshift 添加的元素可能还是一个对象
        let inserted; // 当前用户插入的元素
        let ob = this.__ob__;
         switch(method){
             case 'push': 
             case 'unshift':
                 inserted = args; // arr.push({name: 1}, {age:2})
                 break;
            case 'splice': // 3个 新增的属性 有删除 新增的功能  arr.splice(0,1, {name: 1})
                inserted = args.slice(2)
                 default: 
                  break
         }
        if(inserted) ob.observerArray(inserted) // 将新增属性继续观测
         return result;
    }
})