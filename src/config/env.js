
const baseIP = `http://${window.location.hostname}`
const config = {
  development: {
    // baseIP: 'http://10.203.128.47',
    // port: 8125
    baseIP: 'http://210.22.132.209',
    port: 19070
  },
  test: {
    baseIP,
    port: 19070
  },
  test29: {
    baseIP,
    port: 19070
  },
  stage: {
    baseIP,
    port: 9070
  },
  yuntest: {
    baseIP,
    port: 19070
  },
  production: {
    baseIP,
    port: 9070
  }
}

let CURRENT_ENV
if (process.env.NODE_ENV === 'production') {
  CURRENT_ENV = process.env.VUE_APP_ENV ? config[process.env.VUE_APP_ENV] : config[process.env.NODE_ENV]
} else {
  CURRENT_ENV = config.development
}

// 请求路径前缀
export default `${CURRENT_ENV.baseIP}:${CURRENT_ENV.port}/usermanage/usermanage`
