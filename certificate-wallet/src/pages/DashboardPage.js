// DashboardPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { st_id } = useParams();  // Get the student ID from URL params
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
        <p className="mb-6">Welcome, student {st_id}. Here are your details and recent activities.</p>

        {/* Profile section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">Profile</h3>
          <p><strong>Student ID:</strong> {st_id}</p>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
        </div>

        {/* Recent certificates section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Recent Certificates</h3>
          <ul>
            <li className="mb-2">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => navigate(`/certificates/${st_id}/1`)}
              >
                Certificate 1 - Web Development
              </button>
            </li>
            <li className="mb-2">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => navigate(`/certificates/${st_id}/2`)}
              >
                Certificate 2 - Data Science
              </button>
            </li>
            <li className="mb-2">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => navigate(`/certificates/${st_id}/3`)}
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
