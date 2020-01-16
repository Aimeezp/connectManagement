const CryptoJS = require('crypto-js')

const key = CryptoJS.enc.Utf8.parse('hAnbnasdeibpjsw6') // 16 bits secret key
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') // 16 bits secret key offset key

function Decrypt (word) {
  // const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  // const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(word, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

function Encrypt (word) {
  const encrypted = CryptoJS.AES.encrypt(word, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
}

export const keyWordReg = new RegExp('[\u4e00-\u9fa50-9a-zA-Z]')// match chinese english and number
export const formatDate = (value, format) => {
  const formats = format || 'yyyy-MM-dd'
  const time = new Date(value)
  // const ymd = time.toLocaleDateString().replace(/\//g, '-');
  const years = time.getFullYear()
  let months = time.getMonth() + 1
  let dates = time.getDate()
  let hours = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()
  months = months >= 10 ? months : `0${months}`
  dates = dates >= 10 ? dates : `0${dates}`
  hours = hours >= 10 ? hours : `0${hours}`
  minutes = minutes >= 10 ? minutes : `0${minutes}`
  seconds = seconds >= 10 ? seconds : `0${seconds}`
  return formats === 'yyyy-MM-dd' ? `${years}-${months}-${dates}` : `${years}-${months}-${dates} ${hours}:${minutes}:${seconds}`
}

export default {
  Decrypt,
  Encrypt
}
