import api from "../api/client";

// Lista prenotazioni (con filtro opzionale per status)
export const fetchBookings = async (status = null) => {
  const params = status ? { status } : {};
  const res = await api.get("/api/bookings", { params });
  return res.data;
};

// Cancella prenotazione
export const deleteBooking = async (id) => {
  const res = await api.delete(`/api/bookings/${id}`);
  return res.data;
};
