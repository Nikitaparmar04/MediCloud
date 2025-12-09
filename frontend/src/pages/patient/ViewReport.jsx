import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Calendar, Tag } from 'lucide-react';
import Sidebar from '../../components/common/Sidebar';
import reportService from '../../services/reportService';

const ViewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const data = await reportService.getReport(id);
      setReport(data.report);
    } catch (err) {
      setError(err.message || 'Failed to fetch report');
      console.error('Error fetching report:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const blob = await reportService.downloadReport(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', report?.name || 'report');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading report:', err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} role="patient" />

      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm p-6">
          <button
            onClick={() => navigate('/patient/reports')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Reports
          </button>
          <h1 className="text-3xl font-bold text-gray-800">View Report</h1>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-600">
              Loading report...
            </div>
          ) : error ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center text-red-600">
              {error}
            </div>
          ) : report ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Report Header */}
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <FileText className="text-indigo-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{report.name || report.title}</h2>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {report.date || new Date(report.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Tag size={14} className="mr-1" />
                          {report.type || 'Document'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center space-x-2"
                  >
                    <Download size={18} />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Report Details */}
              <div className="p-6">
                {report.remarks && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Remarks</h3>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{report.remarks}</p>
                  </div>
                )}

                {/* Report Preview */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 p-4 text-center">
                    {report.fileType?.includes('pdf') ? (
                      <iframe
                        src={report.fileUrl}
                        className="w-full h-96"
                        title="Report Preview"
                      />
                    ) : report.fileType?.includes('image') ? (
                      <img
                        src={report.fileUrl}
                        alt={report.name}
                        className="max-w-full h-auto mx-auto"
                      />
                    ) : (
                      <div className="py-12 text-gray-500">
                        <FileText size={48} className="mx-auto mb-4" />
                        <p>Preview not available for this file type</p>
                        <button
                          onClick={handleDownload}
                          className="mt-4 text-indigo-600 hover:text-indigo-700"
                        >
                          Download to view
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-600">
              Report not found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
