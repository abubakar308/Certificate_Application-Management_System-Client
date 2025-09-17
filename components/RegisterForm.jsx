"use client";

import { Formik, Form, Field } from "formik";

export default function RegisterForm() {


  // Backend URL
  const getApiUrl = () => {
     return `${process.env.NEXT_PUBLIC_API_URL}/student/register`;
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
    <Formik onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-2 p-4 border rounded-md w-96">
        {/* Common Fields */}
        <Field name="name" placeholder="Name" className="border p-2" />
        <Field name="email" type="email" placeholder="Email" className="border p-2" />
        <Field name="phone" placeholder="Phone" className="border p-2" />
        <Field name="password" type="password" placeholder="Password" className="border p-2" />

        {/* Conditional Fields */}

            <Field name="studentId" placeholder="Student ID" className="border p-2" />
            <Field name="department" placeholder="Department" className="border p-2" />
      
     
       

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Register as Student
        </button>
      </Form>
    </Formik>
  );
}
