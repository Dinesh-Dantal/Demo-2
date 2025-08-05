// src/services/authService.js
import api from './apiService'; // ✅ Only import it

// 🔐 Authentication
export const login = async (credentials) => {
  return await api.post('/auth/login', credentials);
};

export const registerUser = async (userData) => {
  return axios.post("/api/auth/register", userData);
};


// 🔁 Forgot Password Flow
export const sendOtp = async (email) => {
  return await api.post('/ForgotPassword/send-otp', { email });
};

export const verifyOtp = async (email, otp) => {
  return await api.post('/ForgotPassword/verify-otp', { email, otp });
};

export const resetPassword = async (email, newPassword) => {
  return await api.post('/ForgotPassword/reset-password', {
    email,
    newPassword,
  });
};
