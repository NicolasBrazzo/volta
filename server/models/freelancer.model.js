const supabase = require("../config/db_connection");

const TABLE = "BF_Freelancers";

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

module.exports = {
  findByEmail,
  findById,
  findBySlug,
  create,
  updateById,
};
