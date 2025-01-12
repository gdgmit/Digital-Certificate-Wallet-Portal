import React from "react";

const MyProfile = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-blue-600">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="mb-4">
          <p className="font-medium">Name:</p>
          <p className="text-gray-700">John Doe</p>
        </div>
        <div className="mb-4">
          <p className="font-medium">Email:</p>
          <p className="text-gray-700">johndoe@example.com</p>
        </div>
        <div className="mb-4">
          <p className="font-medium">Role:</p>
          <p className="text-gray-700">Student</p>
        </div>
        <div className="mt-6">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700"
            onClick={() => alert("Edit profile functionality goes here!")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
