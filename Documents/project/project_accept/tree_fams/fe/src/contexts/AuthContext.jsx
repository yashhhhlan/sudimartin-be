import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5200";

  // Set default authorization header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Verify token validity
      axios
        .get(`${API_URL}/api/auth/me`)
        .then((res) => {
          setUser(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          // Token invalid, clear it
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const register = async (
    namaDepan,
    namaBelakang,
    email,
    password,
    gender = "Pria"
  ) => {
    try {
      setError(null);
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        namaDepan,
        namaBelakang,
        email,
        password,
        gender,
      });

      const newToken = res.data.token;
      setToken(newToken);
      localStorage.setItem("token", newToken);
      setUser(res.data.data);

      return res.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registrasi gagal";
      setError(errorMessage);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      const newToken = res.data.token;
      setToken(newToken);
      localStorage.setItem("token", newToken);
      setUser(res.data.data);

      return res.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login gagal";
      setError(errorMessage);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan dalam AuthProvider");
  }
  return context;
};
