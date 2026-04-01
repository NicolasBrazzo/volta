import api from "../api/client";

// Lista servizi del professionista
export const fetchServices = async () => {
  const res = await api.get("/api/services");
  return res.data;
};

// Crea servizio
export const createService = async (serviceData) => {
  const res = await api.post("/api/services", serviceData);
  return res.data;
};

// Modifica servizio
export const updateService = async (id, serviceData) => {
  const res = await api.put(`/api/services/${id}`, serviceData);
  return res.data;
};

// Elimina servizio
export const deleteService = async (id) => {
  const res = await api.delete(`/api/services/${id}`);
  return res.data;
};
