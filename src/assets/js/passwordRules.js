const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
export const newPass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length < 8) {
    callback(new Error('密码长度最小8位!'))
  } else if (!re.test(value)) {
    callback(new Error('密码必须由大写字母、小写字母和阿拉伯数字混合组成'))
  } else {
    callback()
  }
}

const tel = /^1(3|4|5|7|8)\d{9}$/
export const telPass = (rule, value, callback) => {
  if (!tel.test(value)) {
    callback(new Error('请输入正确手机号码'))
  } else {
    callback()
  }
}

const email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
export const emailPass = (rule, value, callback) => {
  if (value === '') {
    callback()
  } else if (!email.test(value)) {
    callback(new Error('请输入正确的邮箱格式'))
  } else {
    callback()
  }
}
