"use client";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getApiUrl = () => `${process.env.NEXT_PUBLIC_API_URL}/student/register`;

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(getApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registration successful! You can now log in.");
        resetForm();
      } else {
        setMessage(`❌ ${data.message || "Registration failed."}`);
      }
    } catch (error) {
      setMessage("❌ Something went wrong.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    studentId: "",
    department: "",
    password: "",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-500 to-blue-600 items-center justify-center text-white p-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">🎓 Student Registration</h2>
            <p className="text-blue-100">
              Create your student account to apply for certificates and track your
              application status easily.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Register Your Account
          </h2>

          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange }) => (
              <Form className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Full Name
                  </label>
                  <Field
                    name="name"
                    placeholder="Enter your full name"
                    className="mt-1 border border-gray-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1 border border-gray-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Phone Number
                  </label>
                  <Field
                    name="phone"
                    placeholder="+8801XXXXXXXXX"
                    className="mt-1 border border-gray-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Student ID
                  </label>
                  <Field
                    name="studentId"
                    placeholder="e.g. 20201100"
                    className="mt-1 border border-gray-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Department
                  </label>
                  <Field
                    name="department"
                    placeholder="e.g. CSE, EEE"
                    className="mt-1 border border-gray-300 rounded-lg w-full p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-600">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="mt-1 border border-gray-300 rounded-lg w-full p-2 pr-10 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    <span
                      className="absolute right-3 top-3 cursor-pointer text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? "Registering..." : "Register as Student"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Message */}
          {message && (
            <p
              className={`mt-4 text-sm ${
                message.startsWith("✅")
                  ? "text-green-600"
                  : "text-red-500 font-medium"
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
