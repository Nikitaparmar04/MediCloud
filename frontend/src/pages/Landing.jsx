import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileText, User } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">Medicare Hub</span>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-6 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Medical Records,<br />Securely Stored & Accessible
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Upload, manage, and share your medical reports with healthcare providers seamlessly.
            Built with MERN stack and deployed on AWS.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 transition shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white text-indigo-600 text-lg rounded-lg hover:bg-gray-50 transition shadow-lg border-2 border-indigo-600"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Upload className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Easy Upload</h3>
            <p className="text-gray-600">
              Upload PDFs, X-rays, prescriptions, and test reports in seconds
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Organized History</h3>
            <p className="text-gray-600">
              All your medical records in one place, accessible anytime
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <User className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Doctor Access</h3>
            <p className="text-gray-600">
              Share your records with doctors for better diagnosis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;