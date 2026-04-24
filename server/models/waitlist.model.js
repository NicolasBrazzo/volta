const supabase = require("../config/db_connection");
const TABLE = "bf_waitlist";

const create = async (email) => {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([{ email }])
    .select()
    .single();
  if (error) throw new Error("DB_CREATE_WAITLIST_ERROR");
  return data;
};

const findByEmail = async (email) => {
  const { data, error } = await supabase
    .from(TABLE)
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (error) throw new Error("DB_FIND_WAITLIST_ERROR");
  return data;
};

module.exports = { create, findByEmail };
