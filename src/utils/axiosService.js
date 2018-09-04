import axios from 'axios';
import store from '../store/store';
import * as types from '../store/mutations-type';

const baseURL = process.env.BASE_URL;

const service = axios.create({
  baseURL: baseURL,
  timeout: 5000
});

service.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers['AccessToken'] = store.state.token;
  }
  return config;
}, error => {
  Promise.reject(error);
});

service.interceptors.response.use(response => {
  return response;
}, error => {
  console.log('err' + error);
  const statue = error.response.status;
  if (status === 403) { // unauthorized token
    store.commit(types.SET_USER_OUT);
    localStorage.setItem('tomato_token', '');
    store.commit(types.SHOW_SIGN_DIALOG);// re-signin
  }
  return Promise.reject(error);
});

export default service;
