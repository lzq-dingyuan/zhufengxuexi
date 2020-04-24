import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
export default {
  input: './src/index.js',
  output: {
    format: 'umd', // 模块化类型
    file: 'dist/umd/vue.js',
    name: 'Vue', // 打包后的全局变量的名字
    sourcemap: true,
  },
  plugins: [  // 使用的插件
    babel({
      exclude: 'node_modules/**', // 使用babel时不考虑babel
    }),
    process.env.ENV === 'development'  // 如果是开发环境的话才可以启动项目
      ? serve({
          open: true,
          openPage: '/public/index.html',
          port: 3000,
          contentBase: '',
        })
      : null,
  ],
};
