/**
 * Genera uno slug URL-safe univoco a partire da nome e cognome.
 * @param {string} firstName
 * @param {string} lastName
 * @param {(slug: string) => Promise<any>} findBySlug - funzione di lookup sul DB
 * @returns {Promise<string>}
 */
async function generateUniqueSlug(firstName, lastName, findBySlug) {
  const base = `${firstName}-${lastName}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  let slug = base;
  let existing = await findBySlug(slug);

  let attempts = 0;
  while (existing && attempts < 5) {
    slug = `${base}-${Math.random().toString(36).substring(2, 6)}`;
    existing = await findBySlug(slug);
    attempts++;
  }

  return slug;
}

module.exports = { generateUniqueSlug };