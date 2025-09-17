"use client";
import RegisterForm from "@/components/RegisterForm";


export default function RegisterPage() {

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>

      {/* Conditional Form Rendering */}
  
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2 capitalize">
         Student Register
          </h2>
          <RegisterForm />
        </div>
    </div>
  );
}
