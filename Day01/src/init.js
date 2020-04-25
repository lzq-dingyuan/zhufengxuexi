import { initState } from './state'
// 在原型上添加一个init方法
export function initMixin(Vue) {
  // Vue初始化操作
  Vue.prototype._init = function (options) {
    // 第一步就要做数据的劫持
     const vm = this; // vue 中使用this.￥options指代用户传递的属性
     vm.$options = options; 

    //  初始化状态
    initState(vm);

  };
}
