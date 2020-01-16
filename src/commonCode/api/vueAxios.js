import axios from 'axios';

const AxiosPlugin = {};

/**
 * vue扩展axios实例插件
 *
 * @param {Object} Vue vue
 * @param {Object} config 默认配置及拦截
 * config : {
 *  baseURL: 请求地址前缀
 *  timeout: 超时时间
 *  headers: 头部其他通用配置
 *  reqSuccess/reqError: 请求拦截函数
 *  resSuccess/resError: 响应拦截函数
 * }
 */
AxiosPlugin.install = (Vue, config) => {
  const defaultCon = {
    baseURL: '/',
    timeout: 10000,
  };
  const con = Object.assign({}, defaultCon, config);
  // 创建axios实例
  const ownAxios = axios.create(con);
  // 请求拦截
  ownAxios.interceptors.request.use(opt => (con.reqSuccess ? con.reqSuccess(opt) : opt), err => (con.reqError ? con.reqError(err) : err));
  // 响应拦截
  ownAxios.interceptors.response.use(opt => (con.resSuccess ? con.resSuccess(opt) : opt), err => (con.resError ? con.resError(err) : err));
  // 挂载Vue实例
  /* eslint no-param-reassign: 0 */
  Vue.prototype.$fetch = opt => ownAxios({
    ...opt,
    method: 'get',
  });
  Vue.prototype.$post = opt => ownAxios({
    ...opt,
    method: 'post',
  });
  Vue.prototype.$put = opt => ownAxios({
    ...opt,
    method: 'put',
  });
  Vue.prototype.$delete = opt => ownAxios({
    ...opt,
    method: 'delete',
  });
};

export default AxiosPlugin;
