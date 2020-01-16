export const Cookie = {
  get (key) {
    const arr = document.cookie.split('; ')
    for (let i = 0; i < arr.length; i += 1) {
      const arr2 = arr[i].trim().split('=')
      if (arr2[0] === key) {
        return arr2[1]
      }
    }
    return ''
  },
  set (setting, day = 7) {
    const oDate = new Date()
    oDate.setDate(oDate.getDate() + day)
    Object.keys(setting).forEach((k) => {
      document.cookie = `${k}=${setting[k]};expires=${oDate}`
    })
  },
  remove (setting) {
    const obj = {}
    setting.forEach((key) => {
      obj[key] = ''
    })
    this.set(obj, -1)
  }
}
