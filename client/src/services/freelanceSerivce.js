import api from "../api/client";

// Chiamata all'API per verificare se è il primo accesso
export const firstAccess = async () => {
  try {
    const res = await api.get(`/auth/firstAccess`);
    return res.data;
  } catch (error) {
    console.error("Error fetching first access status:", error);
    throw error;
  }
};

// Recupera profilo freelancer
export const getProfile = async () => {
  const res = await api.get("/auth/me");
  return res.data.user;
};

// Aggiorna profilo freelancer (business_name, description)
export const updateProfile = async (data) => {
  const res = await api.put("/auth/profile", data);
  return res.data;
};
