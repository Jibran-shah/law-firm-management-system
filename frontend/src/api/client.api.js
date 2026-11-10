// src/api/client.js
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 5000,
  withCredentials:true
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
