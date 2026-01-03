import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

export default function Header() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-2xl hover:opacity-90"
        >
          <span className="text-3xl">🌳</span>
          <span>Silsilah Keluarga</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-100 transition-colors">
            Home
          </Link>
          <Link
            to="/family-tree"
            className="hover:text-blue-100 transition-colors"
          >
            Family Tree
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className="hover:text-blue-100 transition-colors font-semibold"
            >
              ⚙️ Admin Dashboard
            </Link>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-4 pl-6 border-l border-blue-400">
              <div className="text-sm">
                <div className="font-semibold">{user?.namaDepan}</div>
                <div className="text-blue-100 text-xs">
                  {isAdmin ? "🔑 Admin" : "👤 User"}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition-colors font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-2xl"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-blue-700 border-t border-blue-500 p-4"
        >
          <nav className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="hover:text-blue-100 transition-colors py-2"
            >
              Home
            </Link>
            <Link
              to="/family-tree"
              onClick={() => setMobileOpen(false)}
              className="hover:text-blue-100 transition-colors py-2"
            >
              Family Tree
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="hover:text-blue-100 transition-colors py-2 font-semibold"
              >
                ⚙️ Admin Dashboard
              </Link>
            )}

            {isAuthenticated ? (
              <div className="border-t border-blue-500 pt-3 mt-3">
                <div className="text-sm mb-3">
                  <div className="font-semibold">{user?.namaDepan}</div>
                  <div className="text-blue-100 text-xs">
                    {isAdmin ? "🔑 Admin" : "👤 User"}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition-colors font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
              >
                Login
              </Link>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
