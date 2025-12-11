// src/features/dashboard/citizen/DashboardHome.jsx
import { Link } from "react-router-dom"; // সঠিক ইম্পোর্ট

const DashboardHome = () => {
  return (
    <div className="p-6 lg:p-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-primary mb-8 text-center lg:text-left">
        নাগরিক ড্যাশবোর্ড
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="stat bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
          <div className="stat-title text-white/90">মোট রিপোর্ট</div>
          <div className="stat-value text-5xl">12</div>
          <div className="stat-desc text-white/80 mt-2">আপনার সব রিপোর্ট</div>
        </div>

        <div className="stat bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
          <div className="stat-title text-white/90">পেন্ডিং</div>
          <div className="stat-value text-5xl">8</div>
          <div className="stat-desc text-white/80 mt-2">অপেক্ষায় আছে</div>
        </div>

        <div className="stat bg-gradient-to-br from-cyan-500 to-teal-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
          <div className="stat-title text-white/90">চলমান</div>
          <div className="stat-value text-5xl">3</div>
          <div className="stat-desc text-white/80 mt-2">কাজ চলছে</div>
        </div>

        <div className="stat bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
          <div className="stat-title text-white/90">সমাধান</div>
          <div className="stat-value text-5xl">1</div>
          <div className="stat-desc text-white/80 mt-2">সমস্যা সমাধান</div>
        </div>
      </div>

      {/* Guide Message */}
      <div className="bg-base-200 p-8 rounded-2xl text-center">
        <p className="text-xl text-base-content/80 leading-relaxed">
          আপনার রিপোর্ট করা সমস্যাসমূহ দেখতে বাম পাশের মেনু থেকে{" "}
          <Link
            to="/dashboard/my-issues"
            className="font-bold text-primary hover:underline"
          >
            আমার সমস্যাসমূহ
          </Link>{" "}
          অপশনে ক্লিক করুন।
        </p>
        <div className="mt-6">
          <Link
            to="/dashboard/report-issue"
            className="btn btn-success btn-lg shadow-lg"
          >
            নতুন সমস্যা রিপোর্ট করুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;