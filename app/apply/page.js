"use client";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplyPage() {
  const { user, role } = useAuth();
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
    applicationType: 0, // 0: Regular
    sscCertificate: null,
    hscCertificate: null,
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);

      const formData = new FormData();
      for (const key in values) {
        if (values[key] instanceof FileList) {
          formData.append(key, values[key][0]);
        } else {
          formData.append(key, values[key]);
        }
      }

      // Add student details from auth
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
        router.push("/profile");
      }
    } catch (err) {
      console.error("Application Error:", err);
      alert(err.response?.data?.message || "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6 border-b pb-2">
          🎓 Certificate Application Form
        </h2>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Read-only Info */}
              <div>
                <label className="text-gray-600 font-medium">Student Name</label>
                <input
                  value={user?.name || ""}
                  readOnly
                  className="border p-2 rounded w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Student ID</label>
                <input
                  value={user?.studentId || ""}
                  readOnly
                  className="border p-2 rounded w-full bg-gray-100"
                />
              </div>

              {/* Editable Fields */}
              <div>
                <label className="text-gray-600 font-medium">Program</label>
                <Field
                  name="program"
                  className="border p-2 rounded w-full"
                  placeholder="e.g. BSc in CSE"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Batch</label>
                <Field
                  name="batch"
                  className="border p-2 rounded w-full"
                  placeholder="e.g. 52nd"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">
                  Credit Completed
                </label>
                <Field
                  name="creditCompleted"
                  type="number"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Credit Waived</label>
                <Field
                  name="creditWaived"
                  type="number"
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium">Campus</label>
                <Field
                  name="campus"
                  className="border p-2 rounded w-full"
                  placeholder="Main / Permanent"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Mobile</label>
                <Field
                  name="mobile"
                  className="border p-2 rounded w-full"
                  placeholder="+8801XXXXXXXXX"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Date of Birth</label>
                <Field
                  name="dateOfBirth"
                  type="date"
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="text-gray-600 font-medium">Last Semester</label>
                <Field
                  name="lastSemester"
                  className="border p-2 rounded w-full"
                  placeholder="e.g. Spring 2025"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Passing Year</label>
                <Field
                  name="passingYear"
                  type="number"
                  className="border p-2 rounded w-full"
                />
              </div>

              {/* Application Type */}
              <div>
                <label className="text-gray-600 font-medium">Application Type</label>
                <Field
                  as="select"
                  name="applicationType"
                  className="border p-2 rounded w-full"
                >
                  <option value={0}>Regular</option>
                  <option value={1}>Reappear</option>
                  <option value={2}>Improvement</option>
                </Field>
              </div>

              {/* File Uploads */}
              <div>
                <label className="text-gray-600 font-medium">SSC Certificate</label>
                <input
                  type="file"
                  name="sscCertificate"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) =>
                    setFieldValue("sscCertificate", e.target.files)
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">HSC Certificate</label>
                <input
                  type="file"
                  name="hscCertificate"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) =>
                    setFieldValue("hscCertificate", e.target.files)
                  }
                  className="border p-2 rounded w-full"
                />
              </div>

              {/* Submit */}
              <div className="col-span-2 flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
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
