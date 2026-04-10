import api from "../api/client";

// Lista servizi del professionista
export const fetchServices = async () => {
  try {
    const res = await api.get("/api/services");
    return res.data;
  } catch (error) {
    console.error("Errore durante il recupero dei servizi:", error);
    throw error;
  }
};

// Crea servizio
export const createService = async (serviceData) => {
  try {
    const res = await api.post("/api/services", serviceData);
    return res.data;
  } catch (error) {
    console.error("Errore durante la creazione del servizio:", error);
    throw error;
  }
};

// Modifica servizio
export const updateService = async (id, serviceData) => {
  try {
    const res = await api.put(`/api/services/${id}`, serviceData);
    return res.data;
  } catch (error) {
    console.error("Errore durante la modifica del servizio:", error);
    throw error;
  }
};

// Elimina servizio
export const deleteService = async (id) => {
  try {
    const res = await api.delete(`/api/services/${id}`);
    return res.data;
  } catch (error) {
    console.error("Errore durante l'eliminazione del servizio:", error);
    throw error;
  }
};

