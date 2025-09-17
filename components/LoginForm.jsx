"use client";

import { Formik, Form, Field } from "formik";

// Login Form
export default function LoginForm({ userType }) {
  // Initial values
  const getInitialValues = () => ({
    email: "",
    password: "",
  });

  // API URL
  const getApiUrl = () => {
    return `${process.env.NEXT_PUBLIC_API_URL}/${userType}/login`;
  };

  // Submit handler
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await fetch(getApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Login success:", data);

        // token localStorage/session এ রাখবেন
        localStorage.setItem("token", data.token);

        window.location.href = "/profile";
      } else {
        console.error("❌ Login failed:", data.message);
      }

      resetForm();
    } catch (error) {
      console.error("⚠️ Error:", error);
    }
  };

  return (
    <Formik initialValues={getInitialValues()} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-2 p-4 border rounded-md w-96">
        <Field
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2"
        />
        <Field
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2"
        />

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Login as {userType}
        </button>
      </Form>
    </Formik>
  );
}
