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
      return;
    }
    try {
      const idToken = await firebaseUser.getIdToken();
      const res = await api.post("/auth/firebase", { idToken });
      setCurrentUser(res.data.user);
    } catch (err) {
      console.error("Sync failed:", err);
      setCurrentUser(null);
    }
  };

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    await syncWithBackend(res.user);
  };

  const register = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await syncWithBackend(res.user);
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    await syncWithBackend(res.user);
  };

  const logout = async () => {
    await signOut(auth);
    await api.post("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        syncWithBackend(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, register, googleLogin, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};