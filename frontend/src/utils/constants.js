// API Configuration (Vite uses import.meta.env)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',

  // Reports
  UPLOAD_REPORT: '/reports/upload',
  GET_REPORTS: '/reports',
  GET_REPORT: '/reports/:id',
  DELETE_REPORT: '/reports/:id',

  // Patient
  GET_PROFILE: '/patient/profile',
  UPDATE_PROFILE: '/patient/profile',

  // Doctor
  GET_PATIENTS: '/doctor/patients',
  GET_PATIENT_DETAIL: '/doctor/patient/:id',
  GET_PATIENT_REPORTS: '/doctor/patient/:id/reports',
};

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

// User Roles
export const USER_ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
};