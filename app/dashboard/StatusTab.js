"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function StatusTab() {
  const { user, token } = useAuth();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchOwnApplications = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/application/own?studentId=${user.studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplication(res.data.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load your applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchOwnApplications();
  }, [token]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-indigo-600 animate-pulse">Loading your applications...</p>
      </div>
    );

  if (error)
    return <div className="text-center text-red-600 font-medium">{error}</div>;

  if (!application)
    return <div className="text-center text-gray-500 mt-10">No applications found.</div>;

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-6">
        Your Application Status
      </h2>

      <table className="min-w-full text-sm border border-gray-200 rounded-lg">
        <thead className="bg-indigo-100 text-indigo-700 text-left">
          <tr>
            <th className="p-3 border-b">#</th>
            <th className="p-3 border-b">Application Type</th>
            <th className="p-3 border-b">Submitted On</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Remarks</th>
          </tr>
        </thead>

        <tbody>
            <tr className="border-b hover:bg-gray-50 transition">
              <td className="p-3 font-medium">{application?.applicationType || "N/A"}</td>
              <td className="p-3">{new Date(app.createdAt).toLocaleDateString()}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    application.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : app.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {application.status}
                </span>
              </td>
              <td className="p-3 text-gray-600">{application.remarks || "—"}</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}
