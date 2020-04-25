// 把data中的数据都是用Object.defineProperty重新定义 ES5

// 不能兼容IE89以及一些  Vue2.0无法兼容
export function observe(data){
    console.log(data, '这是data')
}