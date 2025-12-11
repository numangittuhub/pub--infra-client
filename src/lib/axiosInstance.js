// src/lib/axiosInstance.js  (ফাইনাল ভার্সন – Step 8.1 অনুযায়ী)
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // http://localhost:5000/api
  withCredentials: true, // httpOnly cookie (jwt) পাঠাবে → সবচেয়ে জরুরি
});

// অপশনাল: 401 হলে সরাসরি লগইন পেজে পাঠাবে (খুবই হেল্পফুল)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // লগইন না থাকলে লগইন পেজে নিয়ে যাবে
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;