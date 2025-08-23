"use client";

import { Formik, Form, Field } from "formik";

export default function RegisterForm({ userType }) {
  // আলাদা initial values per userType
  const getInitialValues = () => {
    switch (userType) {
      case "student":
        return { name: "", email: "", phone: "", studentId: "", password: "", department: "" };
      case "faculty":
        return { name: "", email: "", phone: "", facultyId: "", password: "", department: "", designation: "" };
      case "administrator":
        return { name: "", email: "", phone: "", adminId: "", password: "" };
      case "account":
        return { name: "", email: "", phone: "", accountId: "", password: "", department: "" };
      default:
        return {};
    }
  };

  // Backend URL
  const getApiUrl = () => {
    return `https://server-side-rho-snowy.vercel.app/${userType}/register`;

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
      console.log("✅ Response:", data);
      resetForm();
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <Formik initialValues={getInitialValues()} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-2 p-4 border rounded-md w-96">
        {/* Common Fields */}
        <Field name="name" placeholder="Name" className="border p-2" />
        <Field name="email" type="email" placeholder="Email" className="border p-2" />
        <Field name="phone" placeholder="Phone" className="border p-2" />
        <Field name="password" type="password" placeholder="Password" className="border p-2" />

        {/* Conditional Fields */}
        {userType === "student" && (
          <>
            <Field name="studentId" placeholder="Student ID" className="border p-2" />
            <Field name="department" placeholder="Department" className="border p-2" />
          </>
        )}

        {userType === "faculty" && (
          <>
            <Field name="facultyId" placeholder="Faculty ID" className="border p-2" />
            <Field name="department" placeholder="Department" className="border p-2" />
          </>
        )}

        {userType === "administrator" && (
          <>
            <Field name="adminId" placeholder="Admin ID" className="border p-2" />
          </>
        )}

        {userType === "account" && (
          <>
            <Field name="accountId" placeholder="Account ID" className="border p-2" />
          </>
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Register as {userType}
        </button>
      </Form>
    </Formik>
  );
}
