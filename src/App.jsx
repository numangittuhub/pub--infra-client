// src/App.jsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import router from "./routes/routes";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer"; // চাইলে কমেন্ট করো

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* Navbar + RouterProvider একসাথে Router এর ভিতরে রাখতে হবে */}
        <RouterProvider router={router}>
          {/* এই Children এর মধ্যে যা থাকবে, সবাই Router context পাবে */}
          {() => (
            <>
              <Navbar />
              {/* তোমার সব পেজ এখানে রেন্ডার হবে */}
              <div className="min-h-screen flex flex-col">
                <main className="flex-1 pt-16 bg-base-200">
                  {/* RouterProvider নিজেই পেজ রেন্ডার করবে */}
                </main>
                <Footer />
              </div>
            </>
          )}
        </RouterProvider>

        <Toaster position="top-right" />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;