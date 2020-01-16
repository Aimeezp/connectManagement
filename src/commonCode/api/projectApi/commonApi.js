import CryptoJS from 'crypto-js';
import { get, post, getArraybuffer } from '@/api/apiFun';

const key = CryptoJS.enc.Utf8.parse('hAnbnasdeibpjsw6');
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');

export const requestLogin = (params) => {
  const p = Object.assign({}, params);
  const encrypted = CryptoJS.AES.encrypt(p.password, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  p.password = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  return post('login', p);
};// login
// export const requestLogin = params => post('login', params);// login
export const logout = params => get('logout', params);// logout
export const changePassword = params => post('changePassword', params);// change pwd
export const getAuthorList = params => post('authorList', params);// get user author
export const getImageCode = params => getArraybuffer('imageCode', params);
