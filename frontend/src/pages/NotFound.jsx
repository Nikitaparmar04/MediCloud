import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center">
            <FileText className="text-white" size={32} />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition inline-block"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;