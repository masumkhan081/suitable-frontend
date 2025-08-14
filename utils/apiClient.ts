import axios from 'axios';

// Get the auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Create an axios instance with base URL and default headers
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token in requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized errors (401)
    if (error.response && error.response.status === 401) {
      // Redirect to login page if not already there
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/sign-in')) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = '/auth/sign-in';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
