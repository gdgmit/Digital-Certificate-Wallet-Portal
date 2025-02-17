import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      return 'Email must contain @ symbol.';
    }
    if (!email.includes('.')) {
      return 'Email must contain a domain (e.g., .com, .net).';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email format. Ensure it follows the pattern: example@domain.com';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and Password are required.');
    } else {
      const emailError = validateEmail(email);
      if (emailError) {
        setError(emailError);
      } else if (!validatePassword(password)) {
        setError(
          'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one symbol, and one number.'
        );
      } else {
        setError('');
        console.log('Login successful with:', { email, password });
        setEmail('');
        setPassword('');
        navigate('/');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-700">Login</h2>
        {error && (
          <div className="flex items-center bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-md shadow-md mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-600 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 8A8 8 0 1 1 2 8a8 8 0 0 1 16 0ZM9 5a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0V5Zm1 7a1.2 1.2 0 1 1 0 2.4A1.2 1.2 0 0 1 10 12Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 ${
                error.includes("Email") ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 ${
                error.includes("Password") ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
