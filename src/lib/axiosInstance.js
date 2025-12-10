// src/lib/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // খুব জরুরি → cookie পাঠাবে
});

// Request interceptor → token থাকলে header এ যোগ করা (যদিও আমরা httpOnly cookie ব্যবহার করছি)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → 401 হলে লগআউট করবে
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;