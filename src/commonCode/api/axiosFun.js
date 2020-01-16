import axios from 'axios';
import qs from 'qs';
import store from '@/store';

// 下载文件get请求
export const getArraybufferFile = (url, params) => axios({
  method: 'get',
  url,
  responseType: 'arraybuffer',
  params,
  headers: {
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const getArraybufferRequest = (url, param) => axios.post(url, {
  params: param,
  responseType: 'arraybuffer',
  headers: {
    'Content-Type': 'multipart/form-data;charset=UTF-8',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const postRequestExcel = (url, params) => axios({
  method: 'post',
  url,
  responseType: 'arraybuffer',
  data: qs.stringify(params),
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const postLogtExcel = (url, params) => axios({
  method: 'post',
  url,
  responseType: 'arraybuffer',
  data: params,
  headers: {
    'Content-Type': 'application/json',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});

export const postRequest = (url, params) => axios({ // application/vnd.ms-excel;charset=utf-8
  method: 'post',
  url,
  data: qs.stringify(params),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const postJsonRequest = (url, params) => axios({
  method: 'post',
  url,
  data: params,
  headers: {
    'Content-Type': 'application/json',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const uploadFileRequest = (url, params, callback) => {
  const reqConfig = {
    method: 'post',
    url,
    data: params,
    timeout: 0,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
    },
  };
  if (Object.prototype.toString.call(callback) === '[object Function]') {
    reqConfig.onUploadProgress = callback;
  }
  return axios(reqConfig);
};
export const putRequest = (url, params) => axios({
  method: 'put',
  url,
  data: qs.stringify(params),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const deleteRequest = url => axios({
  method: 'delete',
  url,
});
export const getRequest = (url, params) => axios.get(url, {
  params,
  headers: {
    'Content-Type': 'multipart/form-data;charset=UTF-8',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});


export const postParamsConcat = (url, params) => axios({
  method: 'post',
  url: `${url}/${params.id}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const getParamsConcat = (url, params) => axios({
  method: 'get',
  url: `${url}/${params.projectId}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});

export const postParamsNameConcat = (url, params) => axios({
  method: 'post',
  url: `${url}?${params.name}=${params.value}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const postParam = (url, param) => axios({
  method: 'get',
  url: `${url}/${param.pId}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const postSpliceRequest = (url, params) => axios({
  method: 'post',
  url: `${url}/${params.join('/')}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
const concatRequest = (url, params, method) => axios({
  method,
  url: `${url}/${params.join('/')}`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const postConcatRequest = (url, params) => concatRequest(url, params, 'post');
export const getConcatRequest = (url, params) => concatRequest(url, params, 'get');
