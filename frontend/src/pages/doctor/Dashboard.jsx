import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Sidebar from '../../components/common/Sidebar';

const DoctorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockPatients = [
      { id: 1, name: 'Rajesh Kumar', age: 45, lastVisit: '2024-12-05', reports: 8 },
      { id: 2, name: 'Priya Sharma', age: 32, lastVisit: '2024-12-07', reports: 5 },
      { id: 3, name: 'Amit Patel', age: 58, lastVisit: '2024-12-01', reports: 12 },
      { id: 4, name: 'Sunita Verma', age: 29, lastVisit: '2024-12-08', reports: 3 },
    ];
    setPatients(mockPatients);
    setLoading(false);
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} role="doctor" />

      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
          <p className="text-gray-600 mt-1">View and manage patient records</p>
        </div>

        <div className="p-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">All Patients</h2>
                <div className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg">
                  <Search size={18} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="outline-none"
                  />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-600">Loading patients...</div>
            ) : filteredPatients.length === 0 ? (
              <div className="p-8 text-center text-gray-600">No patients found</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Patient Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Last Visit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Reports
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{patient.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{patient.age} years</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{patient.lastVisit}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                          {patient.reports} files
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => navigate(`/doctor/patient/${patient.id}`)}
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

export default DoctorDashboard;