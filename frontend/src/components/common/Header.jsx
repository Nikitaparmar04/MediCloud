import React from 'react';
import { LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ title, subtitle }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <UserCircle className="text-indigo-600" size={24} />
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.role || '—'}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="inline-flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

