// src/routes/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";

// Public Pages
import Home from "../pages/public/Home";
import AllIssues from "../features/issues/pages/AllIssues";
import IssueDetails from "../features/issues/pages/IssueDetails";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import NotFound from "../pages/public/NotFound";

// Dashboard Pages (আপাতত placeholder)
import CitizenDashboard from "../features/dashboard/citizen/DashboardHome";
import AdminDashboard from "../features/dashboard/admin/AdminDashboard";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/all-issues", element: <AllIssues /> },
  { path: "/issue/:id", element: <IssueDetails /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  // Protected Dashboard Routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout title="Citizen Dashboard">
          <CitizenDashboard />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/admin/*",
    element: (
      <RoleBasedRoute allowedRoles={["admin"]}>
        <DashboardLayout title="Admin Panel">
          <AdminDashboard />
        </DashboardLayout>
      </RoleBasedRoute>
    ),
  },

  { path: "*", element: <NotFound /> },
]);

export default router;