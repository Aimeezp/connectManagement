import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import vueAxios from './commonCode/api/vueAxios'
import vueConfig from './config/axiosConfig'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(vueAxios, vueConfig)

NProgress.configure({ showSpinner: false })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
