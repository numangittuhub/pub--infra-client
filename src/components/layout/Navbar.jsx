// src/components/layout/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div className="navbar bg-primary text-primary-content shadow-lg fixed top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52">
            <li><Link to="/">হোম</Link></li>
            <li><Link to="/all-issues">সকল সমস্যা</Link></li>
            <li><a href="#about">আমাদের সম্পর্কে</a></li>
            <li><a href="#contact">যোগাযোগ</a></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
          Public Infra
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-medium">
          <li><Link to="/" className="hover:bg-primary-focus rounded-lg">হোম</Link></li>
          <li><Link to="/all-issues" className="hover:bg-primary-focus rounded-lg">সকল সমস্যা</Link></li>
          <li><a href="#about" className="hover:bg-primary-focus rounded-lg">আমাদের সম্পর্কে</a></li>
          <li><a href="#contact" className="hover:bg-primary-focus rounded-lg">যোগাযোগ</a></li>
        </ul>
      </div>

      <div className="navbar-end gap-4">
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                <img src={currentUser.photo || "/default-avatar.png"} alt="User" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-64 text-base-content">
              <li className="font-bold text-lg mb-2">{currentUser.name}</li>
              {currentUser.isPremium && <li><div className="badge badge-success">Premium User</div></li>}
              <li><Link to="/dashboard" className="justify-between">ড্যাশবোর্ড</Link></li>
              <li><Link to="/profile">প্রোফাইল</Link></li>
              <li><a onClick={handleLogout} className="text-error">লগআউট</a></li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-accent">লগইন</Link>
            <Link to="/register" className="btn btn-accent">রেজিস্টার</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;