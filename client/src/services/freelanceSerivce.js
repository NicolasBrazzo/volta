import api from "../api/client";

// Chiamata all'API per verificare se è il primo accesso
export const firstAccess = async () => {
  try {
    const res = await api.get(`/auth/firstAccess`);
    return res.data;
  } catch (error) {
    console.error("Errore durante la verifica del primo accesso:", error);
    throw error;
  }
};

// Recupera profilo freelancer
export const getProfile = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data.user;
  } catch (error) {
    console.error("Errore durante il recupero del profilo:", error);
    throw error;
  }
};

// Aggiorna profilo freelancer (business_name, description)
export const updateProfile = async (data) => {
  try {
    const res = await api.put("/auth/profile", data);
    return res.data;
  } catch (error) {
    console.error("Errore durante l'aggiornamento del profilo:", error);
    throw error;
  }
};