import React, { useState } from 'react';
import { Mail, Phone, MapPin, Briefcase, ShieldCheck, User } from 'lucide-react';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  const displayUser = user || {};

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} role="doctor" />

      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-800">Doctor Profile</h1>
          <p className="text-gray-600 mt-1">Review your account and professional details</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="text-indigo-600" size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{displayUser.name || 'Doctor'}</h2>
                <p className="text-gray-600">{displayUser.email || 'No email provided'}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                {displayUser.role || 'doctor'}
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
                <Briefcase className="text-indigo-600" size={18} />
                <p className="text-sm text-gray-500">Specialization</p>
              </div>
              <p className="text-gray-800 font-semibold">{displayUser.specialization || 'Add your specialization'}</p>
              <p className="text-gray-600 text-sm mt-2">
                Share your primary field to help patients find the right doctor.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-5">
              <div className="flex items-center space-x-3 mb-3">
                <ShieldCheck className="text-indigo-600" size={18} />
                <p className="text-sm text-gray-500">License / ID</p>
              </div>
              <p className="text-gray-800 font-semibold">{displayUser.license || 'Add your license number'}</p>
              <p className="text-gray-600 text-sm mt-2">
                Verify your credentials for better patient trust and onboarding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

