import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const reportService = {
  // Upload report
  uploadReport: async (formData) => {
    try {
      const response = await api.post(API_ENDPOINTS.UPLOAD_REPORT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Upload failed' };
    }
  },

  // Get all reports for logged-in patient
  getReports: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_REPORTS);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch reports' };
    }
  },

  // Get single report
  getReport: async (reportId) => {
    try {
      const url = API_ENDPOINTS.GET_REPORT.replace(':id', reportId);
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch report' };
    }
  },

  // Delete report
  deleteReport: async (reportId) => {
    try {
      const url = API_ENDPOINTS.DELETE_REPORT.replace(':id', reportId);
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete report' };
    }
  },

  // Download report
  downloadReport: async (reportId) => {
    try {
      const url = API_ENDPOINTS.GET_REPORT.replace(':id', reportId);
      const response = await api.get(url, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to download report' };
    }
  },
};

export default reportService;