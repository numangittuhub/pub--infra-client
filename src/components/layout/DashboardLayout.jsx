// src/components/layout/DashboardLayout.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashboardLayout = ({ children, title = "Dashboard" }) => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-100 shadow-md px-4">
          <div className="flex-1">
            <label htmlFor="sidebar-drawer" className="btn btn-square btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={currentUser?.photo || "/default-avatar.png"} alt="User" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><span className="font-bold">{currentUser?.name}</span></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 flex-1">{children}</div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-100 text-base-content">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary">Public Infra</h2>
            <p className="text-sm opacity-70">Welcome, {currentUser?.name}</p>
            {currentUser?.isPremium && <div className="badge badge-success mt-2">Premium</div>}
          </div>

          {userRole === "citizen" && (
            <>
              <li><Link to="/dashboard">Dashboard Home</Link></li>
              <li><Link to="/dashboard/my-issues">My Issues</Link></li>
              <li><Link to="/dashboard/report-issue">Report Issue</Link></li>
              <li><Link to="/dashboard/subscription">Subscription</Link></li>
            </>
          )}

          {userRole === "staff" && (
            <>
              <li><Link to="/dashboard/staff">Assigned Issues</Link></li>
              <li><Link to="/dashboard/staff/profile">Profile</Link></li>
            </>
          )}

          {userRole === "admin" && (
            <>
              <li><Link to="/dashboard/admin">Admin Overview</Link></li>
              <li><Link to="/dashboard/admin/issues">All Issues</Link></li>
              <li><Link to="/dashboard/admin/users">Manage Users</Link></li>
              <li><Link to="/dashboard/admin/staff">Manage Staff</Link></li>
              <li><Link to="/dashboard/admin/payments">Payments</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;