// Vue的核心代码 只是Vue的一个声明
import { initMixin } from './init'
function Vue(options){
  this._init(options)
  // 进行vue
}
// 通过引入文件的方式，给Vue原型上添加方法
initMixin(Vue);
// initRender(Vue);
// initRender(Vue);
// initRender(Vue);



export default Vue