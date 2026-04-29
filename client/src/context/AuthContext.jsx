import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";
import { showError } from "../utils/toast";

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [firstAccess, setFirstAccess] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // 1. Controlla se c'è un token nella URL (ritorno da Google OAuth)
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    const errorFromUrl = params.get("error");

    if (errorFromUrl) {
      showError("Autenticazione con Google fallita. Riprova.");
      window.history.replaceState({}, "", window.location.pathname);
    }

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      window.history.replaceState({}, "", window.location.pathname);
    }

    // 2. Controlla se c'è un token in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    // 3. Verifica il token con il backend
    try {
      const res = await api.get("/auth/me");
      if (res.data.user) {
        const u = res.data.user;
        setUser({ id: u.id, email: u.email, slug: u.slug, unique_freelance_code: u.unique_freelance_code });
        const faRes = await api.get("/auth/firstAccess");
        setFirstAccess(faRes.data.firstAccess);
      } else {
        localStorage.removeItem("token");
        setUser(null);
        setFirstAccess(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      localStorage.removeItem("token");
      setUser(null);
      setFirstAccess(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshFirstAccess = async () => {
    try {
      const res = await api.get("/auth/firstAccess");
      setFirstAccess(res.data.firstAccess);
    } catch (err) {
      console.error("First access refresh failed:", err);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.error("Logout error: ", e);
    }
    localStorage.removeItem("token");
    setUser(null);
  };

  

  return (
    <AuthContext.Provider value={{ user, loading, firstAccess, refreshFirstAccess, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
