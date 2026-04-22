import api from "../api/client";

// Info professionista + servizi attivi (pagina pubblica)
export const fetchProfessionalBySlug = async (slug) => {
  try {
    const res = await api.get(`/api/public/${slug}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Slot disponibili per una data e servizio
export const fetchAvailableSlots = async (slug, date, serviceId) => {
  try {
    const res = await api.get(`/api/public/${slug}/slots`, {
      params: { date, serviceId },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Crea prenotazione (pagina pubblica)
export const createBooking = async (slug, bookingData) => {
  try {
    const res = await api.post(`/api/public/${slug}/book`, bookingData);
    return res.data;
  } catch (error) {
    throw error;
  }
};
