import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import certificateData from "../../data/certificate_data.json";

const EditProfile = () => {
    const { st_id } = useParams();
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [originalProfile, setOriginalProfile] = useState(null);

    useEffect(() => {
        // Extract student data from certificates
        let studentProfile = null;
        const studentCertificates = [];

        certificateData.forEach((certificate) => {
            const student = certificate.students.find(
                (s) => s.st_id.toString() === st_id
            );
            if (student) {
                studentProfile = student;
                studentCertificates.push({
                    ...certificate,
                    skills: certificate.skills || [],
                });
            }
        });

        if (studentProfile) {
            const formattedProfile = {
                ...studentProfile,
                email: studentProfile.email_id || "",
                phone: studentProfile.phone_no || "",
                password: studentProfile.password || "",
                confirmPassword: "",
                certificates: studentCertificates,
            };
            setProfile(formattedProfile);
            setOriginalProfile(formattedProfile);
        }
    }, [st_id]);

    const toggleEditMode = () => {
        if (editMode) {
            if (!validatePassword(profile.password) || !validateConfirmPassword()) {
                alert("Please fix the errors before saving.");
                return;
            }
            console.log("Updated Profile Data:", profile);
            alert("Profile updated successfully!");
        }
        setEditMode(!editMode);
    };

    const cancelEditMode = () => {
        setProfile(originalProfile);
        setEditMode(false);
        setPasswordError("");
        setConfirmPasswordError("");
    };

    const handleProfileChange = (e, field) => {
        setProfile({
            ...profile,
            [field]: e.target.value,
        });
    };

    const validatePassword = (password) => {
        if (!password) return true; // Skip validation if password is not being changed
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        const isValid = passwordRegex.test(password);
        setPasswordError(
            isValid
                ? ""
                : "Password must include uppercase, lowercase, number, and special character, and be at least 7 characters."
        );
        return isValid;
    };

    const validateConfirmPassword = () => {
        const isMatch = profile.password === profile.confirmPassword;
        setConfirmPasswordError(isMatch ? "" : "Passwords do not match.");
        return isMatch;
    };

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl text-red-500 font-bold">Profile not found!</p>
            </div>
        );
    }

    const recentCertificate = profile.certificates[profile.certificates.length - 1];
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full p-2">
                        <img
                            src="/external/images/gdg_logo.png"
                            alt="GDG Logo"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <h1 className="text-2xl font-bold">Google Developer Groups</h1>
                </div>
            </header>
            <main className="flex-grow p-8">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-center border-b pb-4">
                        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                        <div className="flex gap-2">
                            {editMode && (
                                <button
                                    onClick={cancelEditMode}
                                    className="px-6 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold transition-all"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                onClick={toggleEditMode}
                                className={`px-6 py-2 rounded-lg ${
                                    editMode
                                        ? "bg-green-500 hover:bg-green-600"
                                        : "bg-blue-500 hover:bg-blue-600"
                                } text-white text-sm font-semibold transition-all`}
                            >
                                {editMode ? "Save Changes" : "Edit Profile"}
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        {[{ label: "Name", value: "st_name" },
                          { label: "Registration No", value: "regno" },
                          { label: "Email", value: "email" },
                          { label: "Phone", value: "phone" },
                          { label: "Department", value: "dept" },
                          { label: "Password", value: "password" },
                        ].map(({ label, value }) => (
                            <div key={value}>
                                <label className="block text-sm font-medium text-gray-700">
                                    {label}
                                </label>
                                <input
                                    type={value === "password" ? "password" : "text"}
                                    value={profile[value]}
                                    onChange={(e) => handleProfileChange(e, value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={!editMode}
                                />
                            </div>
                        ))}

                        {editMode && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        value={profile.confirmPassword}
                                        onChange={(e) => handleProfileChange(e, "confirmPassword")}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {confirmPasswordError && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {confirmPasswordError}
                                    </p>
                                )}
                                {passwordError && (
                                    <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                    <h2 className="text-xl font-bold text-green-800">
                        🎉 Congratulations on your recent certificate!
                    </h2>
                    <div className="mt-4 border-t pt-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {recentCertificate.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">Date:</span> {recentCertificate.date}
                        </p>
                        <p className="text-sm text-gray-600 italic">
                            <span className="font-semibold">Category:</span> {recentCertificate.category}
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800">Certificates</h2>
                    <div className="grid gap-6 mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {profile.certificates.map((cert) => (
                            <div
                                key={cert.cert_id}
                                className="border border-gray-300 rounded-lg p-4 shadow-md bg-gray-50 hover:shadow-lg transition-all"
                            >
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {cert.name}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    <span className="font-semibold">Date:</span> {cert.date}
                                </p>
                                <p className="text-sm text-gray-600 mt-1 italic">
                                    <span className="font-semibold">Category:</span> {cert.category}
                                </p>
                                {cert.skills && cert.skills.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-bold text-gray-700">Skills:</h4>
                                        <ul className="mt-2 list-disc list-inside space-y-1">
                                            {cert.skills.map((skill, idx) => (
                                                <li key={idx} className="text-sm text-gray-600">
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EditProfile;
