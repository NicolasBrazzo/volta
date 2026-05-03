const supabase = require("../config/db_connection");

const TABLE = "bf_freelancers";

// Trova freelancer per email
const findByEmail = async (email) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) throw new Error("DB_FIND_FREELANCER_BY_EMAIL_ERROR");
  return data;
};

// Trova freelancer per id
const findById = async (id) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error("DB_FIND_FREELANCER_BY_ID_ERROR");
  return data;
};

// Trova freelancer per slug
const findBySlug = async (slug) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error("DB_FIND_FREELANCER_BY_SLUG_ERROR");
  return data;
};

// Crea nuovo freelancer
const create = async (freelancerData) => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([freelancerData])
    .select()
    .single();

  if (error) throw new Error("DB_CREATE_FREELANCER_ERROR");
  return data;
};

// Trova freelancer per codice univoco
const findByCode = async (code) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, first_name, last_name, slug, business_name, description, profile_image, unique_freelance_code, booking_page_color, booking_page_layout")
    .eq("unique_freelance_code", code)
    .maybeSingle();

  if (error) throw new Error("DB_FIND_FREELANCER_BY_CODE_ERROR");
  return data;
};

// Aggiorna freelancer
const updateById = async (id, updates) => {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("DB_UPDATE_FREELANCER_ERROR");
  return data;
};

// Elimina freelancer
const deleteById = async (id) => {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw new Error("DB_DELETE_FREELANCER_ERROR");
  return true;
};

module.exports = {
  findByEmail,
  findById,
  findBySlug,
  findByCode,
  create,
  updateById,
};
