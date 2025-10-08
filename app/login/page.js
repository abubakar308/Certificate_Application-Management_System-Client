"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import * as Yup from "yup";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth(); // ✅ access user from context
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Redirect to profile if already logged in
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6, "Min 6 characters").required("Password required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/${role}/login`,
        values
      );

      if (res.status === 200) {
        const { token, data } = res.data.data;
        login(data, token, role);
        router.push("/dashboard");
      }
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading / Redirecting indicator
  if (user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Redirecting to your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-5xl">
        {/* Left Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 to-blue-600 text-white items-center justify-center p-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Welcome Back 👋</h2>
            <p className="text-indigo-100">
              Login to access your dashboard and track your progress easily.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-6">
            <LogIn className="mx-auto text-indigo-600 w-10 h-10" />
            <h2 className="text-2xl font-bold text-gray-800 mt-2">Login to Your Account</h2>
            <p className="text-gray-500 text-sm mt-1">
              Enter your credentials to continue
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-5">
                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="administrator">Administrator</option>
                    <option value="account">Account</option>
                    <option value="library">Library</option>
                    <option value="controller">Controller</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full border border-gray-300 rounded-lg p-2.5 pr-10 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                    <span
                      className="absolute right-3 top-3 cursor-pointer text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Links */}
                <div className="flex justify-between items-center text-sm">
                  <Link href="/forgot-password" className="text-indigo-600 hover:underline">
                    Forgot Password?
                  </Link>
                  <Link href="/register" className="text-indigo-600 hover:underline">
                    Create Account
                  </Link>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 rounded-lg text-white font-semibold transition-all ${
                    loading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {loading ? "Logging in..." : `Login as ${role}`}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
