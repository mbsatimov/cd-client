import axios from 'axios';

import { useAuthStore } from '@/utils/stores';

const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { api };
