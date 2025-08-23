"use client";
import RegisterForm from "@/components/RegisterForm";
import { useState } from "react";


export default function RegisterPage() {
 const [userType, setUserType] = useState("student"); // কোন ফর্ম show হবে সেটা রাখবে

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>

      {/* Select Dropdown */}
      <select
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
        className="border p-2 rounded w-full mb-6"
      >
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="administrator">Administrator</option>
        <option value="account">Account</option>
      </select>

      {/* Conditional Form Rendering */}
      {userType && (
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 capitalize">
            {userType} Register
          </h2>
          <RegisterForm userType={userType} />
        </div>
      )}
    </div>
  );
}
