import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, Upload, Eye, Download } from 'lucide-react';
import Sidebar from '../../components/common/Sidebar';
import reportService from '../../services/reportService';

const PatientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await reportService.getReports();
      setReports(data.reports || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const totalReports = reports.length;
    const lastUpload = reports.length > 0 ? reports[0].date : 'N/A';
    const totalSize = reports.reduce((acc, report) => {
      const size = parseFloat(report.size);
      return acc + (isNaN(size) ? 0 : size);
    }, 0);
    return { totalReports, lastUpload, totalSize: totalSize.toFixed(1) };
  };

  const stats = calculateStats();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} role="patient" />

      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-800">My Medical Reports</h1>
          <p className="text-gray-600 mt-1">View and manage your uploaded reports</p>
        </div>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Reports</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalReports}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <FileText className="text-indigo-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Last Upload</p>
                  <p className="text-xl font-bold text-gray-800 mt-1">{stats.lastUpload}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-green-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Storage Used</p>
                  <p className="text-xl font-bold text-gray-800 mt-1">{stats.totalSize} MB</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Upload className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Recent Reports</h2>
                <button
                  onClick={() => navigate('/patient/upload')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center space-x-2"
                >
                  <Upload size={18} />
                  <span>Upload New</span>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-600">Loading reports...</div>
            ) : reports.length === 0 ? (
              <div className="p-8 text-center text-gray-600">
                No reports found. Upload your first report!
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{report.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{report.size}</td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-800">
                          <Eye size={18} />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Download size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;