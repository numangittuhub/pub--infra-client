// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "../services/firebase";
import api from "../lib/axiosInstance";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase user → Backend এ sync করা
  const syncWithBackend = async (firebaseUser) => {
    if (!firebaseUser) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    try {
      const idToken = await firebaseUser.getIdToken();
      const res = await api.post("/auth/firebase", { idToken });
      setCurrentUser(res.data.user);
    } catch (err) {
      console.error("Backend sync failed:", err);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (name, email, password, photo = null) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = res.user;

    const idToken = await firebaseUser.getIdToken();
    const formData = new FormData();
    formData.append("idToken", idToken);
    if (name) formData.append("name", name);
    if (photo) formData.append("photo", photo);

    const backendRes = await api.post("/auth/firebase", formData);
    setCurrentUser(backendRes.data.user);
    toast.success("Registration successful!");
  };

  // Login
  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    await syncWithBackend(res.user);
    toast.success("Login successful!");
  };

  // Google Login
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    await syncWithBackend(res.user);
    toast.success("Google login successful!");
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    await api.post("/auth/logout");
    setCurrentUser(null);
    toast.success("Logged out");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      syncWithBackend(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    currentUser,
    loading,
    login,
    register,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>}
    </AuthContext.Provider>
  );
};