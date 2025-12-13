import axios from 'axios';

/**
 * Axios instance configured with base URL and interceptors.
 * Base URL defaults to localhost:5000 if VITE_API_URL is not set.
 */
const api = axios.create({
    baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api',
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        if (user) {
            const { token } = JSON.parse(user);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
