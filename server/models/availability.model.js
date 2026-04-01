const supabase = require("../config/db_connection");

const TABLE = "bf_availability";

// Disponibilità settimanale di un professionista
const findByProfessionalId = async (professionalId) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("professional_id", professionalId)
    .order("day_of_week", { ascending: true });

  if (error) throw new Error("DB_FIND_AVAILABILITY_ERROR");
  return data;
};

// Disponibilità per un giorno specifico
const findByDay = async (professionalId, dayOfWeek) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("professional_id", professionalId)
    .eq("day_of_week", dayOfWeek)
    .maybeSingle();

  if (error) throw new Error("DB_FIND_AVAILABILITY_BY_DAY_ERROR");
  return data;
};

// Upsert disponibilità (crea o aggiorna)
const upsert = async (availabilityArray) => {
  const { data, error } = await supabase
    .from(TABLE)
    .upsert(availabilityArray, { onConflict: "professional_id,day_of_week" })
    .select();

  if (error) throw new Error("DB_UPSERT_AVAILABILITY_ERROR");
  return data;
};

module.exports = {
  findByProfessionalId,
  findByDay,
  upsert,
};
