import api from "../api/client";

// Lista prenotazioni (con filtro opzionale per status)
export const fetchBookings = async (status = null) => {
  try {
    const params = status ? { status } : {};
    const res = await api.get("/api/bookings", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Dettaglio singola prenotazione
export const fetchBookingById = async (id) => {
  try {
    const res = await api.get(`/api/bookings/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Cancella prenotazione
export const deleteBooking = async (id) => {
  try {
    const res = await api.delete(`/api/bookings/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
