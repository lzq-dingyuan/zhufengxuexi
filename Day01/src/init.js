// 在原型上添加一个init方法
export function initMixin(Vue) {
  // Vue初始化操作
  Vue.prototype._init = function (options) {
    console.log(options, '这是options');

    // 第一步就要做数据的劫持
  };
}
