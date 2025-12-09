import React, { useEffect, useState } from 'react';
import { Eye, Download, Trash2, RefreshCw } from 'lucide-react';
import Sidebar from '../../components/common/Sidebar';
import reportService from '../../services/reportService';

const MyReports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await reportService.getReports();
      setReports(data.reports || []);
    } catch (err) {
      setError(err.message || 'Unable to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (reportId, name = 'report') => {
    try {
      const blob = await reportService.downloadReport(reportId);
      const url = window.URL.createObjectURL(new Blob([blob]));
      window.open(url, '_blank');
    } catch (err) {
      setError(err.message || 'Unable to view report');
    }
  };

  const handleDownload = async (reportId, name = 'report') => {
    try {
      const blob = await reportService.downloadReport(reportId);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(err.message || 'Download failed');
    }
  };

  const handleDelete = async (reportId) => {
    if (!window.confirm('Delete this report?')) return;
    setDeletingId(reportId);
    try {
      await reportService.deleteReport(reportId);
      setReports((prev) => prev.filter((r) => (r.id || r._id) !== reportId));
    } catch (err) {
      setError(err.message || 'Unable to delete report');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} role="patient" />

      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Reports</h1>
            <p className="text-gray-600 mt-1">View, download, or delete your uploaded reports</p>
          </div>
          <button
            onClick={loadReports}
            disabled={loading}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-400"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-600">Loading reports...</div>
            ) : reports.length === 0 ? (
              <div className="p-8 text-center text-gray-600">No reports found.</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map((report) => {
                    const id = report.id || report._id;
                    return (
                      <tr key={id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{report.name || report.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {report.date || new Date(report.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                            {report.type || 'Document'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{report.size || '—'}</td>
                        <td className="px-6 py-4 text-sm space-x-3">
                          <button
                            onClick={() => handleView(id, report.name || report.title)}
                            className="text-indigo-600 hover:text-indigo-800"
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleDownload(id, report.name || report.title)}
                            className="text-green-600 hover:text-green-800"
                            title="Download"
                          >
                            <Download size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(id)}
                            disabled={deletingId === id}
                            className="text-red-600 hover:text-red-800 disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReports;

