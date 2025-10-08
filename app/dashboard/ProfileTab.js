"use client";
import { useAuth } from "../context/AuthContext";

export default function ProfileTab() {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Profile Info</h2>
      {user ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Student ID:</strong> {user.studentId}</p>
        </div>
      ) : (
        <p className="text-gray-500">No user data found</p>
      )}
    </div>
  );
}
