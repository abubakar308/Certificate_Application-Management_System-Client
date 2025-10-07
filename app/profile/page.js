"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
const { user, role, logout } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!user?.studentId) return; 

    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/application/own?studentId=${user.studentId}`
        );
        console.log("Fetched applications:", res.data.data.clearance);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    fetchApplications();
  }, [user]);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>

      <h2>User Information</h2>
      {user ? (
        <>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Phone: {user?.phone}</p>
          <p>Student ID: {user?.studentId}</p>
          <p>Role: {role}</p>
          <button>Apply Certificate</button>
        </>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
}
