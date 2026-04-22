import api from "../api/client";

// Lista servizi del professionista
export const fetchServices = async () => {
  try {
    const res = await api.get("/api/services");
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Crea servizio
export const createService = async (serviceData) => {
  try {
    const res = await api.post("/api/services", serviceData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Modifica servizio
export const updateService = async (id, serviceData) => {
  try {
    const res = await api.put(`/api/services/${id}`, serviceData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Elimina servizio
export const deleteService = async (id) => {
  try {
    const res = await api.delete(`/api/services/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
