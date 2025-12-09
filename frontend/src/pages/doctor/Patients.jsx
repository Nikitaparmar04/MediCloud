import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, RefreshCw, AlertCircle } from 'lucide-react';
import Sidebar from '../../components/common/Sidebar';
import api from '../../services/api';
import { API_ENDPOINTS } from '../../utils/constants';

const Patients = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(API_ENDPOINTS.GET_PATIENTS);
      setPatients(response.data.patients || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.email?.toLowerCase().includes(q) ||
        p.phone?.toLowerCase().includes(q)
    );
  }, [patients, searchQuery]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} role="doctor" />

      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
            <p className="text-gray-600 mt-1">Search and open patient histories</p>
          </div>
          <button
            onClick={loadPatients}
            disabled={loading}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-400"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 flex items-center space-x-2 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-3 text-indigo-700">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Users size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Patients</p>
                  <p className="text-xl font-semibold text-gray-800">{patients.length}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg w-full md:w-80">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full outline-none"
                />
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-600">Loading patients...</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-gray-600">No patients found.</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Visit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reports</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filtered.map((patient) => (
                    <tr key={patient.id || patient._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{patient.name || 'Unknown'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{patient.email || '—'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{patient.phone || '—'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {patient.lastVisit
                          ? new Date(patient.lastVisit).toLocaleDateString()
                          : 'Not available'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                          {patient.reportCount ?? patient.reports?.length ?? 0} files
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => navigate(`/doctor/patient/${patient.id || patient._id}`)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
                        >
                          View History
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

export default Patients;

