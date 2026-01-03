import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { WorkspaceProvider } from "./context/WorkspaceContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import UserDetailPage from "./pages/UserDetailPage";
import MemberDetailPage from "./pages/MemberDetailPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import FamilyDashboard from "./pages/FamilyDashboard";
import UserFamilyView from "./pages/UserFamilyView";
import FamilyTreeVisualization from "./components/FamilyTreeVisualization";
import "./styles/index.css";

function AppContent() {
  return (
    <>
      <Header />
      <main className="bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <HomePage />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/family-tree"
            element={
              <ProtectedRoute>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <HomePage />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:id"
            element={
              <ProtectedRoute>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <UserDetailPage />
                </div>
              </ProtectedRoute>
            }
          />

          {/* Member Detail Route (from family tree) */}
          <Route
            path="/member/:id"
            element={
              <ProtectedRoute>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <MemberDetailPage />
                </div>
              </ProtectedRoute>
            }
          />

          {/* User Family View (Public Family Trees) */}
          <Route
            path="/family-view/:familyId"
            element={
              <ProtectedRoute>
                <UserFamilyView />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Family Management Routes */}
          <Route
            path="/family/:familyId"
            element={
              <ProtectedRoute requireAdmin={true}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <FamilyDashboard />
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/families"
            element={
              <ProtectedRoute requireAdmin={true}>
                <FamilyDashboard />
              </ProtectedRoute>
            }
          />

          {/* Family Editor Route */}
          <Route
            path="/family/:familyId/editor"
            element={
              <ProtectedRoute requireAdmin={true}>
                <FamilyTreeVisualization />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-12">
        <p>© 2025 Silsilah Keluarga App. All rights reserved.</p>
      </footer>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WorkspaceProvider>
          <AppContent />
        </WorkspaceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
