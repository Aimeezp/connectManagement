import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/views/Login.vue')
const Home = () => import('@/views/Home.vue')
const AccountTable = () => import('@/views/account/AccountTable.vue')
const AccountInfo = () => import('@/views/account/AccountInfo.vue')
const AccountManagment = () => import('@/views/account/AccountManagment.vue')
const AccountHome = () => import('@/views/account/AccountHome.vue')
// const System = () => import('@/views/System.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/account-list',
          redirect: '/account-list',
          component: AccountHome,
          title: '账号管理',
          children: [
            {
              path: '/account-list',
              component: AccountTable
            },
            {
              path: '/account-list/account-info',
              component: AccountInfo,
              title: '账号详情'
            },
            {
              path: '/account-list/account-managment',
              component: AccountManagment,
              title: '账号管理'
            }
          ]
        }
        // {
        //   path: '/system',
        //   component: System,
        //   title: '系统管理'
        // }
      ]
    }
  ]
})
