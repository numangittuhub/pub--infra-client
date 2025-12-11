// src/pages/public/Home.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import ReportIssueModal from "../../features/issues/components/ReportIssueModal";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { currentUser } = useAuth();

  return (
    <>
      {/* Hero Section */}
      <div className="hero min-h-screen bg-gradient-to-br from-primary to-secondary text-white">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              আমাদের শহর, আমাদের দায়িত্ব
            </h1>
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              রাস্তার গর্ত, ভাঙা লাইট, আবর্জনার স্তূপ — আর চুপ করে থাকবেন না!<br />
              এক ক্লিকে রিপোর্ট করুন, আমরা সমাধান করব।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {currentUser ? (
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn btn-accent btn-lg text-xl shadow-lg hover:scale-105 transition-transform"
                >
                  নতুন সমস্যা রিপোর্ট করুন
                </button>
              ) : (
                <Link to="/login" className="btn btn-accent btn-lg text-xl">
                  লগইন করে রিপোর্ট করুন
                </Link>
              )}

              <Link to="/all-issues" className="btn btn-outline btn-light btn-lg text-xl">
                সকল সমস্যা দেখুন
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">কেন আমাদের সাথে যোগ দেবেন?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-6xl mb-4">Quick Report</div>
                <h3 className="card-title">৩০ সেকেন্ডে রিপোর্ট</h3>
                <p>ছবি তুলে লোকেশন দিন — বাকিটা আমরা দেখছি</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-6xl mb-4">Real-time Tracking</div>
                <h3 className="card-title">প্রতি মুহূর্তের আপডেট</h3>
                <p>আপনার রিপোর্টের স্ট্যাটাস লাইভ দেখুন</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="text-6xl mb-4">Priority Boost</div>
                <h3 className="card-title">জরুরি? বুস্ট করুন!</h3>
                <p>মাত্র ১০০ টাকায় আপনার সমস্যা সবার উপরে!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Resolved Issues */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">সম্প্রতি সমাধান হওয়া সমস্যা</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
            <div key={i} className="card bg-base-100 shadow-lg border border-success">
              <figure>
                <img
                  src={`https://source.unsplash.com/random/400x300/?fixed,${i}`}
                  alt="Resolved"
                  className="h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">ভাঙা রাস্তার গর্ত পূরণ</h3>
                <p>মিরপুর ১০ গোলচক্কর</p>
                <div className="badge badge-success gap-2">
                  Resolved
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      {/* Report Issue Modal */}
      <ReportIssueModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Home;