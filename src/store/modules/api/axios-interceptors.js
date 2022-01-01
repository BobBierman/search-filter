// import axios from 'axios';
// import store from '@/store/index';

export default function setup() {
  console.log('interceptors setup');
  /* axios.interceptors.request.use((config) => {
    const page = store.getters['_auth/getPage'];
    console.log('interceptors', page);
    // const token = store.getters.token;
    // if (token) {
    //  config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  }, (err) => {
    console.log('interceptors err', err);
    return Promise.reject(err);
  }); */
}
