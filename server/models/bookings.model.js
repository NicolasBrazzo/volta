const supabase = require("../config/db_connection");

const TABLE = "bf_bookings";

// Lista prenotazioni di un professionista
const findByProfessionalId = async (professionalId, status = null) => {
  let query = supabase
    .from(TABLE)
    .select("*, bf_services(name, duration_minutes, price, color)")
    .eq("professional_id", professionalId)
    .order("date", { ascending: true });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Supabase Error:", error);
    return []; // Return empty array instead of throwing if table/relation fails or no data
  }
  return data;
};

// Trova prenotazione per id
const findById = async (id) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*, bf_services(name, duration_minutes, price, color)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Supabase Error:", error);
    return null;
  }
  return data;
};

// Prenotazioni in un range di date (per calcolo slot)
const findByDateRange = async (professionalId, startDate, endDate) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("professional_id", professionalId)
    .neq("status", "cancelled")
    .gte("date", startDate)
    .lte("date", endDate);

  if (error) throw new Error("DB_FIND_BOOKINGS_BY_DATE_ERROR");
  return data;
};

// Crea prenotazione
const create = async (bookingData) => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([bookingData])
    .select()
    .single();

  if (error) throw new Error("DB_CREATE_BOOKING_ERROR");
  return data;
};

// Aggiorna prenotazione (es. status, google_event_id)
const updateById = async (id, updates) => {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("DB_UPDATE_BOOKING_ERROR");
  return data;
};

// Elimina prenotazione
const deleteById = async (id) => {
  const { data, error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("DB_DELETE_BOOKING_ERROR");
  return data;
};

module.exports = {
  findByProfessionalId,
  findById,
  findByDateRange,
  create,
  updateById,
  deleteById,
};
