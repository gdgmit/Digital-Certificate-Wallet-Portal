// DashboardPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Certificate from './Certificate';

const DashboardPage = () => {
  const { st_id } = useParams(); // Get the student ID from URL params
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="container mx-auto p-6 sm:p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Dashboard</h2>
        <p className="text-lg text-gray-600 mb-8">
          Welcome, student <span className="font-semibold text-gray-900">{st_id}</span>. Here are your details and recent activities.
        </p>

        {/* Profile section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Profile</h3>
          <p className="text-gray-600">
            <strong>Student ID:</strong> <span className="text-gray-900">{st_id}</span>
          </p>
          <p className="text-gray-600">
            <strong>Name:</strong> <span className="text-gray-900">John Doe</span>
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> <span className="text-gray-900">john.doe@example.com</span>
          </p>
        </div>

        {/* Recent certificates section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Certificates</h3>
          <ul className="space-y-3">
            <li>
              <button
                className="text-blue-600 bg-white hover:underline font-medium"
                onClick={() => navigate('/certificate')}
              >
                Certificate 1 - Web Development
              </button>
            </li>
            <li>
              <button
                className="text-blue-600 bg-white hover:underline font-medium"
                onClick={() => navigate('/certificate')}
              >
                Certificate 2 - Data Science
              </button>
            </li>
            <li>
              <button
                className="text-blue-600 bg-white hover:underline font-medium"
                onClick={() => navigate('/certificate')}
              >
                Certificate 3 - Machine Learning
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
