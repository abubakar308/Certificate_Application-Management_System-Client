"use client";

import LoginForm from "@/components/LoginForm";
import { useState } from "react";

export default function LoginPage() {
  const [userType, setUserType] = useState("student");

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <select
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="administrator">Administrator</option>
        <option value="account">Account</option>
        <option value="librarian">Librarian</option>
      </select>

      <LoginForm userType={userType} />
    </div>
  );
}
