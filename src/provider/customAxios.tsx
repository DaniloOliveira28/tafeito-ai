import axios from 'axios'

import { base_api } from '../utils/api';

const hasToken = () => {
 return typeof localStorage.getItem("token") === 'string';
}
const api = axios.create({
  baseURL: base_api,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    if (hasToken() === true) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
);


export { api };