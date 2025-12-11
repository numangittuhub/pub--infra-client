// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content py-10 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand & Description */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-primary">Public Infra</h2>
            <p className="text-sm opacity-90 leading-relaxed">
              আমাদের শহরকে আরো সুন্দর ও নিরাপদ করতে আপনার সহযোগিতা প্রয়োজন।<br />
              এক ক্লিকে রিপোর্ট করুন — আমরা দ্রুত সমাধান করব।
            </p>
            <div className="flex gap-4">
              <a href="#" className="btn btn-circle btn-outline btn-sm hover:bg-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="btn btn-circle btn-outline btn-sm hover:bg-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05-.78-.83-1.9-1.35-3.13-1.35-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.81 1.91 3.58-.71-.02-1.38-.22-1.96-.55v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.55 1.71 2.14 2.95 4.04 2.99-1.48 1.16-3.33 1.85-5.34 1.85-.35 0-.69-.02-1.03-.06 1.91 1.23 4.18 1.95 6.61 1.95 7.93 0 12.27-6.57 12.27-12.27 0-.19-.01-.37-.02-.56.84-.6 1.56-1.36 2.14-2.22z"/>
                </svg>
              </a>
              <a href="#" className="btn btn-circle btn-outline btn-sm hover:bg-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 2.86 8.14 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62 0-.62 0-.62 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.64-1.35-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 2.5-.34c.85.01 1.71.11 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48 3.98-1.35 6.84-5.08 6.84-9.49 0-5.5-4.46-9.96-9.96-9.96z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">কুইক লিঙ্ক</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="link link-hover">হোম</Link></li>
              <li><Link to="/all-issues" className="link link-hover">সকল সমস্যা</Link></li>
              <li><a href="#" className="link link-hover">আমাদের সম্পর্কে</a></li>
              <li><a href="#" className="link link-hover">যোগাযোগ</a></li>
              <li><a href="#" className="link link-hover">গোপনীয়তা নীতি</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">যোগাযোগ</h3>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                +880 1234-567890
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                support@publicinfra.com
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                ঢাকা, বাংলাদেশ
              </p>
            </div>
          </div>

          {/* App Download (Optional) */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">মোবাইলে ব্যবহার করুন</h3>
            <p className="text-sm mb-4">খুব শিগগিরই Android & iOS অ্যাপ আসছে!</p>
            <div className="flex gap-3">
              <button className="btn btn-outline btn-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.38-1.11-.51-2.18-.51-3.31 0-1.35.62-2.36.53-3.35-.37C2.43 14.74 3.68 8.19 7.7 8.08c1.02-.03 2 .27 2.96.75.88.44 1.63.44 2.51 0 1.12-.58 1.9-.9 2.92-.87 1.19.03 2.17.62 2.9 1.59-2.53 1.47-2.15 4.34.45 5.74-.96 1.41-2.22 2.88-3.39 3.99zM12 4.53c.06-1.49.85-2.97 2.16-3.97 1.26 1.06 2.13 2.64 1.96 4.2-.21 1.64-1.14 3.22-2.12 4.02-1.11-1.04-1.92-2.52-2 3.75z"/></svg>
                App Store
              </button>
              <button className="btn btn-outline btn-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h18v18H3zM12.5 7.5l3.5 6h-7l3.5-6zm-1 8h2v5h-2v-5z"/></svg>
                Play Store
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-content/20 mt-10 pt-6 text-center">
          <p className="text-sm">
            © 2025 <span className="font-bold text-primary">Public Infra</span> • সকল অধিকার সংরক্ষিত
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;