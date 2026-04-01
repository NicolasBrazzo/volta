import api from "../api/client";

// Recupera disponibilità settimanale
export const fetchAvailability = async () => {
  const res = await api.get("/api/availability");
  return res.data;
};

// Aggiorna disponibilità
export const updateAvailability = async (availabilityData) => {
  const res = await api.put("/api/availability", availabilityData);
  return res.data;
};
