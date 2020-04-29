// 初始化状态的流程
import { observe } from './observer/index'
export function initState( vm ){
    const opts = vm.$options;
    // vue的数据来源 属性方法 数据 计算属性  watch
    if(opts.props){
        initProps(vm);
    }
    if(opts.methods){
        initMethod(vm);
    }
    if(opts.data){
        initData(vm);
    }
    if(opts.computed){
        initComputed(vm);
    }
    if(opts.watch){
        initWatch(vm);
    }

    function initProps(){}
    function initMethod(){}
    function initData(vm){
        let data = vm.$options.data; // 用户传递的data
        data = vm._data = typeof data === 'function' ? data.call(vm) : data
        // 接下来要进行对象劫持， 原因是用户改变了数据，我希望能得到通知 =》 刷新页面
        // MVVM模式，数据变化可以驱动属兔变化
        // Object.defineProperty()给属性增加get方法和set方法
        observe(data);  // 响应式原理
    }
    function initComputed(){}
    function initWatch(){}

}