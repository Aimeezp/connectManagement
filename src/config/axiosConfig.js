import { Message } from 'element-ui'
import baseIP from './env'
import errorCode from '../commonCode/assets/js/errorCode/index'
import qs from 'qs'

export default {
  // 请求路径前缀
  baseURL: baseIP,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },

  // 请求拦截器
  reqSuccess (config) {
    const item = Object.assign({}, config)
    item.headers['Authorization'] = sessionStorage.getItem('Authorization') ? `Bearer ${sessionStorage.getItem('Authorization')}` : ''
    if (item.headers['Content-Type'] && item.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') !== -1 && item.data) {
      item.data = qs.stringify(item.data)
    }
    return item
  },
  reqError (error) {
    return error
  },
  // 响应拦截器
  resSuccess (config) {
    const { data: { status } } = config
    if (parseInt(status, 10) !== 1) {
      // if (!errorCode.hasOwnProperty(status)) continue
      if (errorCode[status]) Message.error(errorCode[status])
    }
    return config.data
  },
  resError (error) {
    return error
  }

}
