import axios from 'axios';

const API = axios.create({
  baseURL: 'https://axionwave-backend.onrender.com/api'
});

API.interceptors.request.use((config) => {
  const user = localStorage.getItem('axionwave_user');
  if (user) {
    config.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return config;
});

// Auth
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const getMe = () => API.get('/auth/me');

// Shipments
export const createShipment = (data) => API.post('/shipments/create', data);
export const getMyShipments = () => API.get('/shipments/my');
export const getAllShipments = () => API.get('/shipments/all');
export const trackShipment = (trackingId) => API.get(`/shipments/track/${trackingId}`);
export const updateShipment = (id, data) => API.put(`/shipments/update/${id}`, data);
export const deleteShipment = (id) => API.delete(`/shipments/delete/${id}`);

// Users
export const getAllUsers = () => API.get('/users/all');
export const updateProfile = (data) => API.put('/users/profile/update', data);
export const deleteUser = (id) => API.delete(`/users/delete/${id}`);

// Payments
export const createPayment = (data) => API.post('/payments/create', data);
export const getMyPayments = () => API.get('/payments/my');
export const getAllPayments = () => API.get('/payments/all');
export const updatePayment = (id, data) => API.put(`/payments/update/${id}`, data);

export default API;