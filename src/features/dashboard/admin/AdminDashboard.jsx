const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-error">এডমিন প্যানেল</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="stat bg-error text-white rounded-lg">
          <div className="stat-title text-white">মোট ইস্যু</div>
          <div className="stat-value">156</div>
        </div>
        <div className="stat bg-warning text-white rounded-lg">
          <div className="stat-title text-white">পেন্ডিং</div>
          <div className="stat-value">89</div>
        </div>
        <div className="stat bg-info text-white rounded-lg">
          <div className="stat-title text-white">চলমান</div>
          <div className="stat-value">45</div>
        </div>
        <div className="stat bg-success text-white rounded-lg">
          <div className="stat-title text-white">সমাধান</div>
          <div className="stat-value">22</div>
        </div>
        <div className="stat bg-accent text-white rounded-lg">
          <div className="stat-title text-white">মোট পেমেন্ট</div>
          <div className="stat-value">৳12,500</div>
        </div>
      </div>
      <div className="alert alert-info mt-10">
        <span>বাম পাশের মেনু থেকে ইস্যু/ইউজার/স্টাফ ম্যানেজ করুন</span>
      </div>
    </div>
  );
};

export default AdminDashboard;