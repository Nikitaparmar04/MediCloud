import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Upload, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ isOpen, toggleSidebar, role }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const patientLinks = [
    { path: '/patient/dashboard', icon: FileText, label: 'My Reports' },
    { path: '/patient/upload', icon: Upload, label: 'Upload Report' },
    { path: '/patient/profile', icon: User, label: 'Profile' },
  ];

  const doctorLinks = [
    { path: '/doctor/patients', icon: User, label: 'Patients' },
    { path: '/doctor/dashboard', icon: FileText, label: 'Reports' },
    { path: '/doctor/profile', icon: User, label: 'Profile' },
  ];

  const links = role === 'patient' ? patientLinks : doctorLinks;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`bg-indigo-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4 flex items-center justify-between">
        {isOpen && <span className="text-xl font-bold">Medicare Hub</span>}
        <button onClick={toggleSidebar}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className="mt-8">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`w-full px-4 py-3 flex items-center space-x-3 transition ${
                isActive ? 'bg-indigo-800' : 'hover:bg-indigo-800'
              }`}
            >
              <Icon size={20} />
              {isOpen && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="absolute bottom-4 left-4 right-4 px-4 py-3 flex items-center space-x-3 hover:bg-indigo-800 transition rounded-lg"
      >
        <LogOut size={20} />
        {isOpen && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;