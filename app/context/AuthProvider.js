"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/application/own?studentId=${localStorage.getItem("userId")}`, {});
      setApplications(res.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addApplication = async (formData) => {
    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/application/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchApplications();
    } catch (err) {
      console.error("Create error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <AuthContext.Provider value={{ applications, loading, fetchApplications, addApplication }}>
      {children}
    </AuthContext.Provider>
  );
};
