import axios from 'axios';
import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// API functions
export const apiClient = {
  // Submissions
  submissions: {
    getAll: (params) => api.get('/submissions', { params }),
    getById: (id) => api.get(`/submissions/${id}`),
    create: (data) => api.post('/submissions', data),
    updateStatus: (id, status) => api.patch(`/submissions/${id}/status`, { status }),
    delete: (id) => api.delete(`/submissions/${id}`),
    getAnalytics: () => api.get('/submissions/analytics')
  },

  // Services
  services: {
    getAll: (params) => api.get('/services', { params }),
    create: (data) => api.post('/services', data),
    update: (id, data) => api.put(`/services/${id}`, data),
    delete: (id) => api.delete(`/services/${id}`)
  },

  // Gallery
  gallery: {
    getAll: (params) => api.get('/gallery', { params }),
    create: (data) => api.post('/gallery', data),
    update: (id, data) => api.put(`/gallery/${id}`, data),
    delete: (id) => api.delete(`/gallery/${id}`)
  }
};

export default api;