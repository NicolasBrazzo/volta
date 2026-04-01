import api from "../api/client";

// Info professionista + servizi attivi (pagina pubblica)
export const fetchProfessionalBySlug = async (slug) => {
  const res = await api.get(`/api/public/${slug}`);
  return res.data;
};

// Slot disponibili per una data e servizio
export const fetchAvailableSlots = async (slug, date, serviceId) => {
  const res = await api.get(`/api/public/${slug}/slots`, {
    params: { date, serviceId },
  });
  return res.data;
};

// Crea prenotazione (pagina pubblica)
export const createBooking = async (slug, bookingData) => {
  const res = await api.post(`/api/public/${slug}/book`, bookingData);
  return res.data;
};
