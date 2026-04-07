import api from "../api/client";

// Recupera disponibilità settimanale
export const fetchAvailability = async () => {
  try {
    const res = await api.get("/api/availability");
    return res.data;
  } catch (error) {
    console.error("Errore durante il recupero della disponibilità:", error);
    throw error;
  }
};

// Aggiorna disponibilità
export const updateAvailability = async (availabilityData) => {
  try {
    const res = await api.put("/api/availability", availabilityData);
    return res.data;
  } catch (error) {
    console.error("Errore durante l'aggiornamento della disponibilità:", error);
    throw error;
  }
};
