const path = require('path');

const resolve = dir => path.join(__dirname, dir);
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'management' : '/', // 静态资源打包路径
  configureWebpack: () => ({
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
        vue$: 'vue/dist/vue.esm.js',
        scss_vars: '@/assets/styles/scss/vars.scss',
      },
    },
  }),
  productionSourceMap: false,
};
