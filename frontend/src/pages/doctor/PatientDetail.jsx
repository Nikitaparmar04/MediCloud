import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Eye, Calendar, User } from 'lucide-react';
import Sidebar from '../../components/common/Sidebar';
import api from '../../services/api';
import { API_ENDPOINTS } from '../../utils/constants';

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [patient, setPatient] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPatientDetails();
  }, [id]);

  const fetchPatientDetails = async () => {
    try {
      setLoading(true);
      const patientUrl = API_ENDPOINTS.GET_PATIENT_DETAIL.replace(':id', id);
      const reportsUrl = API_ENDPOINTS.GET_PATIENT_REPORTS.replace(':id', id);
      
      const [patientResponse, reportsResponse] = await Promise.all([
        api.get(patientUrl),
        api.get(reportsUrl)
      ]);
      
      setPatient(patientResponse.data.patient);
      setReports(reportsResponse.data.reports || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch patient details');
      console.error('Error fetching patient details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewReport = (reportId) => {
    // Open report in new tab or modal
    window.open(`/api/reports/${reportId}/view`, '_blank');
  };

  const handleDownloadReport = async (reportId, reportName) => {
    try {
      const response = await api.get(`/reports/${reportId}/download`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', reportName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error downloading report:', err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} role="doctor" />

      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm p-6">
          <button
            onClick={() => navigate('/doctor/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Patient Details</h1>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-600">
              Loading patient details...
            </div>
          ) : error ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center text-red-600">
              {error}
            </div>
          ) : (
            <>
              {/* Patient Info Card */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="text-indigo-600" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {patient?.name || 'Unknown Patient'}
                    </h2>
                    <p className="text-gray-600">
                      {patient?.email || 'No email provided'}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      {patient?.age && <span>Age: {patient.age} years</span>}
                      {patient?.phone && <span>Phone: {patient.phone}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reports Table */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Medical Reports</h2>
                    <span className="text-gray-600">{reports.length} reports found</span>
                  </div>
                </div>

                {reports.length === 0 ? (
                  <div className="p-8 text-center text-gray-600">
                    No reports found for this patient.
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Report Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reports.map((report) => (
                        <tr key={report.id || report._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            <div className="flex items-center">
                              <FileText className="text-indigo-600 mr-2" size={18} />
                              {report.name || report.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="text-gray-400 mr-2" size={16} />
                              {report.date || new Date(report.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                              {report.type || 'Document'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {report.size || 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-sm space-x-2">
                            <button
                              onClick={() => handleViewReport(report.id || report._id)}
                              className="text-indigo-600 hover:text-indigo-800 p-1"
                              title="View Report"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleDownloadReport(report.id || report._id, report.name || report.title)}
                              className="text-green-600 hover:text-green-800 p-1"
                              title="Download Report"
                            >
                              <Download size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
