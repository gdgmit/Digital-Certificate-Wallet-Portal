import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-white text-white">
      <h1 className="text-5xl font-extrabold mb-6 text-center">Welcome to Digital Certificate Wallet

      </h1>
      <p className="text-lg mb-8 text-center">
        A secure platform to manage and share your certificates effortlessly.
      </p>
    </div>
  );
};

export default HomePage;