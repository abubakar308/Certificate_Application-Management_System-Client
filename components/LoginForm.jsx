"use client";

import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [role, setRole] = useState("student");

  const initialValues = { email: "", password: "" };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/${role}/login`,
        values
      );

      if (res.status === 200) {
        const { token, data } = res.data.data;
        console.log(data, token)
        login(data, token, role); // ✅ role saved to context
        router.push("/profile");
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-2 p-4 border rounded-md w-96">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="administrator">Administrator</option>
          <option value="account">Account</option>
          <option value="library">Library</option>
          <option value="controller">Controller</option>
        </select>

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
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login as {role}
        </button>
      </Form>
    </Formik>
  );
}
