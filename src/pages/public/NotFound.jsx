// src/pages/public/NotFound.jsx
const NotFound = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-9xl font-bold text-error">404</h1>
          <p className="text-3xl mt-6">পেজ পাওয়া যায়নি!</p>
          <p className="text-xl mt-4 opacity-80">
            আপনি যে পেজটি খুঁজছেন, সেটি হয়তো মুছে ফেলা হয়েছে বা সরানো হয়েছে।
          </p>
          <div className="mt-10">
            <a href="/" className="btn btn-primary btn-lg">
              হোমে ফিরে যান
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; // এটা ছিল না — এখন আছে!