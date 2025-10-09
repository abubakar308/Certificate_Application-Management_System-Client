"use client";
import { Formik, Form, Field } from "formik";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function ApplyPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    program: user?.program || "",
    batch: user?.batch || "",
    creditCompleted: "",
    creditWaived: "",
    campus: "",
    mobile: user?.phone || "",
    email: user?.email || "",
    dateOfBirth: "",
    lastSemester: "",
    passingYear: "",
    applicationType: 0,
    sscCertificate: null,
    hscCertificate: null,
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (values[key] instanceof FileList) {
          formData.append(key, values[key][0]);
        } else {
          formData.append(key, values[key]);
        }
      });

      formData.append("studentId", user?.studentId);
      formData.append("studentName", user?.name);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/application/apply`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.status === 201) {
        alert("✅ Application submitted successfully!");
        resetForm();
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Application Error:", err);
      alert(err.response?.data?.message || "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-3 sm:px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-6 text-center">
          🎓 Certificate Application Form
        </h2>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Student Info */}
              <div>
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  Student Name
                </label>
                <input
                  value={user?.name || ""}
                  readOnly
                  className="border p-2 sm:p-3 rounded w-full bg-gray-100"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  Student ID
                </label>
                <input
                  value={user?.studentId || ""}
                  readOnly
                  className="border p-2 sm:p-3 rounded w-full bg-gray-100"
                />
              </div>

              {/* Editable Fields */}
              <div>
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  Program
                </label>
                <Field
                  name="program"
                  className="border p-2 sm:p-3 rounded w-full"
                  placeholder="e.g. BSc in CSE"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  Batch
                </label>
                <Field
                  name="batch"
                  className="border p-2 sm:p-3 rounded w-full"
                  placeholder="e.g. 52nd"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  Credit Completed
                </label>
                <Field
                  name="creditCompleted"
                  type="number"
                  className="border p-2 sm:p-3 rounded w-full"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  Credit Waived
                </label>
                <Field
                  name="creditWaived"
                  type="number"
                  className="border p-2 sm:p-3 rounded w-full"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  Campus
                </label>
                <Field
                  name="campus"
                  className="border p-2 sm:p-3 rounded w-full"
                  placeholder="Main / Permanent"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  Mobile
                </label>
                <Field
                  name="mobile"
                  className="border p-2 sm:p-3 rounded w-full"
                  placeholder="+8801XXXXXXXXX"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="border p-2 sm:p-3 rounded w-full"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  Date of Birth
                </label>
                <Field
                  name="dateOfBirth"
                  type="date"
                  className="border p-2 sm:p-3 rounded w-full"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  Last Semester
                </label>
                <Field
                  name="lastSemester"
                  className="border p-2 sm:p-3 rounded w-full"
                  placeholder="e.g. Spring 2025"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  Passing Year
                </label>
                <Field
                  name="passingYear"
                  type="number"
                  className="border p-2 sm:p-3 rounded w-full"
                />
              </div>

              {/* Application Type */}
              <div className="sm:col-span-2">
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  Application Type
                </label>
                <Field
                  as="select"
                  name="applicationType"
                  className="border p-2 sm:p-3 rounded w-full"
                >
                  <option value={0}>Regular</option>
                  <option value={1}>Reappear</option>
                  <option value={2}>Improvement</option>
                </Field>
              </div>

              {/* File Upload */}
              <div>
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  SSC Certificate
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) =>
                    setFieldValue("sscCertificate", e.target.files)
                  }
                  className="border p-2 sm:p-3 rounded w-full"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium text-sm sm:text-base">
                  HSC Certificate
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) =>
                    setFieldValue("hscCertificate", e.target.files)
                  }
                  className="border p-2 sm:p-3 rounded w-full"
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-1 sm:col-span-2 flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-base sm:text-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
