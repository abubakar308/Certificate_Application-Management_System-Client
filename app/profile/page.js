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
  const [activeTab, setActiveTab] = useState("profile"); // 👈 dynamic content controller

  // ✅ Authentication protect
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  // ✅ Fetch profile and application data
  useEffect(() => {
    if (!user?._id) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/student/profile/${user._id}`
        );
        setProfile(res.data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
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

  // ✅ Sidebar buttons
const sidebarButtons = [
  { key: "profile", label: "Profile Info" },
  { key: "apply", label: "Submit Application", route: "/apply" },
  { key: "status", label: "Check Status" },
];
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ✅ Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white flex flex-col py-6 px-4">
        <h2 className="text-xl font-bold text-center mb-8">Dashboard</h2>

       {sidebarButtons.map((btn) => (
  <button
    key={btn.key}
    onClick={() => {
      if (btn.route) {
        router.push(btn.route);
      } else {
        setActiveTab(btn.key);
      }
      setSidebarOpen(false);
    }}
    className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
      activeTab === btn.key ? "bg-indigo-500" : "hover:bg-indigo-600"
    }`}
  >
    {btn.label}
  </button>
))}

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-center"
        >
          Logout
        </button>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "profile" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              My Profile
            </h2>
            {user? (
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
            ) : (
              <p className="text-gray-500">Profile not found.</p>
            )}
          </div>
        )}

        {activeTab === "apply" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Submit Application
            </h2>
            <p className="text-gray-600">
              Application submission form will appear here.
            </p>
          </div>
        )}

        {activeTab === "status" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Application Status
            </h2>
            {application ? (
              <div>
                <p>
                  <strong>Type:</strong>{" "}
                  {application.applicationType === 0
                    ? "Regular"
                    : application.applicationType === 1
                    ? "Reappear"
                    : "Improvement"}
                </p>
                <p>
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
              <p className="text-gray-500">No applications yet.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
