import axios from 'axios';

import { postRefresh } from '@/utils/api/requests';
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

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        const response = await postRefresh();
        useAuthStore.getState().auth.setAccessToken(response.data.token);
        return api.request(originalRequest);
      } catch {
        if (location.pathname !== '/login') location.href = '/login';
      }
    }

    throw error;
  }
);

export { api };
