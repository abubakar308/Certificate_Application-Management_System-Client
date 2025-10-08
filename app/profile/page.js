"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, role, logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/${role}/profile/${user._id}`
        );
        setProfile(res.data.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/application/own?studentId=${user._id}`
        );
        setApplication(res.data.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchApplications();
  }, [user, role]);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const handleEdit = () => {
    router.push("/edit-profile");
  };

  const handleApply = () => {
    router.push("/apply");
  };

  const handleCheckStatus = () => {
    router.push("/application-status");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-500 animate-pulse">Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-semibold text-indigo-700">My Profile</h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Profile Information */}
        {user ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 font-medium">Full Name</p>
                <p className="text-gray-800 font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Email</p>
                <p className="text-gray-800 font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Phone</p>
                <p className="text-gray-800 font-semibold">{user.phone}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Student ID</p>
                <p className="text-gray-800 font-semibold">{user.studentId}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Program</p>
                <p className="text-gray-800 font-semibold">{user.program || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Batch</p>
                <p className="text-gray-800 font-semibold">{user.batch || "N/A"}</p>
              </div>
            </div>

            {/* Application Info */}
            {application ? (
              <div className="mt-6 bg-indigo-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                  Application Status
                </h3>
                <p className="text-gray-700">
                  <strong>Type:</strong> {application.applicationType === 0
                    ? "Regular"
                    : application.applicationType === 1
                    ? "Reappear"
                    : "Improvement"}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong>{" "}
                  {application.applicationStatus === 0
                    ? "Faculty Pending"
                    : application.applicationStatus === 1
                    ? "Library Pending"
                    : application.applicationStatus === 2
                    ? "Accounts Pending"
                    : application.applicationStatus === 3
                    ? "Registrar Pending"
                    : "Exam Controller Pending"}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 italic mt-4">
                No application found yet.
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Edit Profile
              </button>

              <button
                onClick={handleApply}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Submit Application
              </button>

              <button
                onClick={handleCheckStatus}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Check Status
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Profile not found</p>
        )}
      </div>
    </div>
  );
}
