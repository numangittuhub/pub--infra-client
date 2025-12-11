// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16 bg-base-200">
        <Outlet />   {/* এখানে সব পেজ রেন্ডার হবে */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;