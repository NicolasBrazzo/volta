const supabase = require("../config/db_connection");

const TABLE = "BF_Services";

// Lista servizi di un professionista
const findByProfessionalId = async (professionalId) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("professional_id", professionalId)
    .order("created_at", { ascending: true });

  if (error) throw new Error("DB_FIND_SERVICES_ERROR");
  return data;
};

// Servizi attivi di un professionista (per pagina pubblica)
const findActiveByProfessionalId = async (professionalId) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("professional_id", professionalId)
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) throw new Error("DB_FIND_ACTIVE_SERVICES_ERROR");
  return data;
};

// Trova servizio per id
const findById = async (id) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error("DB_FIND_SERVICE_ERROR");
  return data;
};

// Crea servizio
const create = async (serviceData) => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([serviceData])
    .select()
    .single();

  if (error) throw new Error("DB_CREATE_SERVICE_ERROR");
  return data;
};

// Aggiorna servizio
const updateById = async (id, updates) => {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("DB_UPDATE_SERVICE_ERROR");
  return data;
};

// Elimina servizio
const deleteById = async (id) => {
  const { data, error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("DB_DELETE_SERVICE_ERROR");
  return data;
};

module.exports = {
  findByProfessionalId,
  findActiveByProfessionalId,
  findById,
  create,
  updateById,
  deleteById,
};
