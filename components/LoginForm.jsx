"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import * as Yup from "yup";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

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
        router.push("/profile");
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Please login to your account
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="administrator">Administrator</option>
                  <option value="account">Account</option>
                  <option value="library">Library</option>
                  <option value="controller">Controller</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <Link href="/forgot-password" className="text-indigo-600 hover:underline">
                  Forgot password?
                </Link>
                <Link href="/register" className="text-indigo-600 hover:underline">
                  Create account
                </Link>
              </div>

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
  );
}
