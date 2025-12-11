// src/routes/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";

// Public Pages
import Home from "../pages/public/Home";
import AllIssues from "../features/issues/pages/AllIssues";
import IssueDetails from "../features/issues/pages/IssueDetails";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import NotFound from "../pages/public/NotFound";

// Protected Pages (এগুলো পরে যোগ করবে)
import ProtectedRoute from "./ProtectedRoute";
import CitizenDashboard from "../features/dashboard/citizen/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-issues", element: <AllIssues /> },
      { path: "/issue/:id", element: <IssueDetails /> },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <CitizenDashboard />
          </ProtectedRoute>
        ),
      },
      // আরো ড্যাশবোর্ড রাউট যোগ করবে
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
]);

export default router;