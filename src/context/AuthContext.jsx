// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  signOut,
  onAuthStateChanged,
} from "../services/firebase";
import axios from "axios";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register with email/password + save to backend
  const register = async (name, email, password, photoFile) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (photoFile) formData.append("photo", photoFile);

    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
      formData,
      { withCredentials: true }
    );

    toast.success("Registration successful!");
    return user;
  };

  // Login
  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
    return res.user;
  };

  // Google Login
  const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    // Backend এ save করা আছে কি না চেক করবে পরে
    toast.success("Google login successful!");
    return res.user;
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully");
  };

  // Firebase auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/auth/me`,
            { withCredentials: true }
          );
          setCurrentUser(res.data.user);
          setUserRole(res.data.user.role);
        } catch (err) {
          setCurrentUser(null);
          setUserRole(null);
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};