// MyCertificatesPage.js

import { useParams, useNavigate } from 'react-router-dom';


const MyCertificatesPage = () => {
  const { st_id } = useParams();  // Get the student ID from URL params
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <h2 className="text-3xl  font-extrabold text-gray-800  mb-4">My Certificates</h2>
        <p className=" text-gray-800 mb-6">Below are the certificates that you have earned.</p>

        {/* Certificates list */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ul>
            <li className="mb-2">
              <button
                className="text-blue-600 bg-white hover:underline"
                onClick={() => navigate('/certificate')}
              >
                Certificate 1 - Web Development
              </button>
            </li>
            <li className="mb-2">
              <button
                className="text-blue-600 bg-white hover:underline"
                onClick={() => navigate('/certificate')}
              >
                Certificate 2 - Data Science
              </button>
            </li>
            <li className="mb-2">
              <button
                className="text-blue-600 bg-white hover:underline"
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

export default MyCertificatesPage;
