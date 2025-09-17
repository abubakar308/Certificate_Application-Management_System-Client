"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/student/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.status === 200) {
          setUser(res.data.student);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []); // ✅ run only once after component mounts

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>

      <h2>User Information</h2>
      {user ? (
        <>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
}
