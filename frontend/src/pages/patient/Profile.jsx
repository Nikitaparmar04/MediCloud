import React, { useState } from 'react';
import { Mail, Phone, MapPin, FileText, ShieldCheck, User } from 'lucide-react';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  const displayUser = user || {};

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} role="patient" />

      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal details and account info</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="text-indigo-600" size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{displayUser.name || 'Patient'}</h2>
                <p className="text-gray-600">{displayUser.email || 'No email provided'}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                {displayUser.role || 'patient'}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow p-5">
              <div className="flex items-center space-x-3 mb-2">
                <Mail className="text-indigo-600" size={18} />
                <p className="text-sm text-gray-500">Email</p>
              </div>
              <p className="text-gray-800 font-semibold">{displayUser.email || 'Not set'}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-5">
              <div className="flex items-center space-x-3 mb-2">
                <Phone className="text-indigo-600" size={18} />
                <p className="text-sm text-gray-500">Phone</p>
              </div>
              <p className="text-gray-800 font-semibold">{displayUser.phone || 'Not set'}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-5">
              <div className="flex items-center space-x-3 mb-2">
                <MapPin className="text-indigo-600" size={18} />
                <p className="text-sm text-gray-500">Location</p>
              </div>
              <p className="text-gray-800 font-semibold">{displayUser.location || 'Not set'}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow p-5">
              <div className="flex items-center space-x-3 mb-3">
                <FileText className="text-indigo-600" size={18} />
                <p className="text-sm text-gray-500">Records</p>
              </div>
              <p className="text-gray-800 font-semibold">
                {displayUser.reportCount ?? displayUser.records ?? 'Keep your reports updated'}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Upload and manage your medical documents for easy access.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-5">
              <div className="flex items-center space-x-3 mb-3">
                <ShieldCheck className="text-indigo-600" size={18} />
                <p className="text-sm text-gray-500">Security</p>
              </div>
              <p className="text-gray-800 font-semibold">Your data is protected</p>
              <p className="text-gray-600 text-sm mt-2">
                We secure your medical records. Keep your contact info current for alerts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

