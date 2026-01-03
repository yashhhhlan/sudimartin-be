import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import UserHomePage from "./UserHomePage";

/**
 * Home Page - Main entry point
 * Redirects admin to AdminDashboard
 * Shows UserHomePage for regular users
 */
export const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect admin to admin dashboard
  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  // Show user home page for regular users
  if (user && user.role !== "admin") {
    return <UserHomePage />;
  }

  // Default fallback (should not reach here due to redirect)
  return <UserHomePage />;
};

export default HomePage;
