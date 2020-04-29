import { initState } from './state'
import { compileToFunction } from './compiler/index'
// 在原型上添加一个init方法
export function initMixin(Vue) {
  // Vue初始化操作
  Vue.prototype._init = function (options) {
    // 第一步就要做数据的劫持
     const vm = this; // vue 中使用this.￥options指代用户传递的属性
     vm.$options = options; 

    //  初始化状态
    initState(vm);

    // 如果用户传入el属性，需要将页面渲染出来
    // 实现挂载流程
    if(vm.$options.el){
      vm.$mount(vm.$options.el)
    }
  };
  Vue.prototype.$mount = function (el){
    const vm = this;
    const options = vm.$options
    el = document.querySelector(el);

    // 默认先会查找有没有render方法，没有会采用template ，在没有就会用el中的内容
    if(!options.render){
      // 对模板进行编译
      let template = options.template; // 取出模板
      if(!template && el){
        template = el.outerHTML;
      }
      const render = compileToFunction(template)
      options.render = render
      // 我们需要将template转为render方法 vue1.0用得纯字符串编译正则转换，效率低 vue2.0使用虚拟dom 采用dom diff

    }

  }
}
