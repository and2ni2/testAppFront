import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export function onRequest(config) {
  const token = localStorage.getItem('token');
  config.headers.authorization = 'Bearer ' + token;

  return config;
}

export function onRequestError(error) {
  console.log('api:onRequestError', error);
}

export function onResponse(response) {
  console.log('api:onResponse:' + response.config.url, response.data);
  return response;
}

export function onResponseError(error) {
  console.log('api:onResponseError', error);

  return Promise.reject(error.response);
}

export default instance
