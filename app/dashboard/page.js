"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // for mobile sidebar toggle icons
import ProfileTab from "./components/ProfileTab";
import ApplyTab from "./components/ApplyTab";
import StatusTab from "./components/StatusTab";

export default function DashboardPage() {
  const { user, token, role, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

 useEffect(() => {
    // redirect logic inside useEffect
    if (!token || !user) {
      router.replace("/login");
    }
  }, [token, user, router]);
  const sidebarButtons = [
    { key: "profile", label: "Profile" },
    { key: "apply", label: "Submit Application" },
    { key: "status", label: "Application Status" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Header */}
      <div className="flex md:hidden items-center justify-between bg-indigo-700 text-white p-4">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block md:w-64 bg-indigo-700 text-white p-6 space-y-4 transition-all duration-300 fixed md:relative top-0 left-0 z-20 w-64 h-full`}
      >
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>

        {sidebarButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => {
              setActiveTab(btn.key);
              setSidebarOpen(false);
            }}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activeTab === btn.key ? "bg-indigo-500" : "hover:bg-indigo-600"
            }`}
          >
            {btn.label}
          </button>
        ))}

        {role !== "student" && (
  <button
    key="view"
    onClick={() => setActiveTab("view")}
    className={`w-full text-left px-4 py-2 rounded-lg transition ${
      activeTab === "view" ? "bg-indigo-500" : "hover:bg-indigo-600"
    }`}
  >
    View Applications
  </button>
)}

        <button
          onClick={() => {
            logout();
            router.replace("/login");
          }}
          className="w-full text-left px-4 py-2 mt-4 bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Overlay for mobile when sidebar open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 md:ml-64 transition-all duration-300">
        <div className="max-w-5xl mx-auto">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "apply" && <ApplyTab />}
          {activeTab === "status" && <StatusTab />}
          {activeTab === "view" && <ViewApplicationsTab />}
        </div>
      </div>
    </div>
  );
}
