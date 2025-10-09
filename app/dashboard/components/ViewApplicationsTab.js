// ViewApplicationsTab.jsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function ViewApplicationsTab() {
  const { user, token, role } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !role) return;
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/application/role/${role}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setApplications(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [token, role]);

  if (loading)
    return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">
        Applications for {role.charAt(0).toUpperCase() + role.slice(1)} Clearance
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-500 text-center">No pending applications.</p>
      ) : (
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-indigo-100 text-indigo-700">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Student Name</th>
              <th className="p-3 border-b">Student ID</th>
              <th className="p-3 border-b">Program</th>
              <th className="p-3 border-b">Batch</th>
              <th className="p-3 border-b">Application Type</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{app.studentId?.studentName}</td>
                <td className="p-3">{app.studentId?.studentId}</td>
                <td className="p-3">{app.studentId?.program}</td>
                <td className="p-3">{app.studentId?.batch}</td>
                <td className="p-3">
                  {app.applicationType === 0
                    ? "Regular"
                    : app.applicationType === 1
                    ? "Reappear"
                    : "Improvement"}
                </td>
                <td className="p-3 font-semibold text-yellow-600">
                  Pending ({role})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
