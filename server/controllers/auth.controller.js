const express = require("express");
const jwt = require("jsonwebtoken");
const supabase = require("../config/db_connection");
const { google } = require("googleapis");

const Freelancer = require("../models/freelancer.model");
const Services = require("../models/services.model");
const Availability = require("../models/availability.model");
const protect = require("../middleware/auth");

const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/jwt");
const { createOAuth2Client, SCOPES } = require("../config/google");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const router = express.Router();

// ── Utility: genera slug unico dal nome ──────────────────────────
async function generateUniqueSlug(firstName, lastName) {
  const base = `${firstName}-${lastName}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  let slug = base;
  let existing = await Freelancer.findBySlug(slug);

  let attempts = 0;
  while (existing && attempts < 5) {
    const suffix = Math.random().toString(36).substring(2, 6);
    slug = `${base}-${suffix}`;
    existing = await Freelancer.findBySlug(slug);
    attempts++;
  }

  return slug;
}

// ── Seed data per la prima registrazione ─────────────────────────
async function seedDefaults(professionalId) {
  const defaultServices = [
    {
      professional_id: professionalId,
      name: "Consulenza base",
      description: "Sessione introduttiva",
      duration_minutes: 30,
      price: 50,
      color: "#3B82F6",
      is_active: true,
    },
    {
      professional_id: professionalId,
      name: "Consulenza approfondita",
      description: "Analisi dettagliata",
      duration_minutes: 60,
      price: 90,
      color: "#8B5CF6",
      is_active: true,
    },
    {
      professional_id: professionalId,
      name: "Sessione completa",
      description: "Percorso completo",
      duration_minutes: 90,
      price: 120,
      color: "#10B981",
      is_active: true,
    },
  ];

  const defaultAvailability = [0, 1, 2, 3, 4, 5, 6].map((day) => ({
    professional_id: professionalId,
    day_of_week: day,
    start_time: "09:00",
    end_time: "18:00",
    is_active: day >= 1 && day <= 5,
  }));

  await Promise.all(defaultServices.map((s) => Services.create(s)));
  await Availability.upsert(defaultAvailability);
}

// ── GET /auth/google — Redirect a Google OAuth ───────────────────
router.get("/google", (req, res) => {
  const oauth2Client = createOAuth2Client();

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });

  res.redirect(authUrl);
});

// ── GET /auth/google/callback — Callback da Google ───────────────
router.get("/google/callback", async (req, res) => {
  const { code, error: googleError } = req.query;

  if (googleError || !code) {
    return res.redirect(`${FRONTEND_URL}/?error=auth_failed`);
  }

  try {
    const oauth2Client = createOAuth2Client();

    // Scambia il codice per i token
    const { tokens } = await oauth2Client.getToken(code);
    console.log("GOOGLE TOKENS:", tokens);
    oauth2Client.setCredentials(tokens);

    // Ottieni profilo utente da Google
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data: profile } = await oauth2.userinfo.get();

    const { email, given_name, family_name, picture } = profile;

    // Cerca freelancer esistente
    let freelancer = await Freelancer.findByEmail(email);

    if (freelancer) {
      // LOGIN: aggiorna i token Google
      const updates = { google_access_token: tokens.access_token };
      if (tokens.refresh_token) {
        updates.google_refresh_token = tokens.refresh_token;
      }
      await Freelancer.updateById(freelancer.id, updates);
    } else {
      // REGISTRAZIONE: crea profilo + seed data
      const slug = await generateUniqueSlug(
        given_name || "user",
        family_name || "new",
      );

      freelancer = await Freelancer.create({
        email,
        first_name: given_name || "",
        last_name: family_name || "",
        slug,
        profile_image: picture || null,
        google_access_token: tokens.access_token,
        google_refresh_token: tokens.refresh_token || null,
        calendar_id: "primary",
      });

      await seedDefaults(freelancer.id);
    }

    // Genera JWT
    const token = jwt.sign(
      { sub: freelancer.id, email: freelancer.email, slug: freelancer.slug },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    res.redirect(`${FRONTEND_URL}/dashboard?token=${token}`);
  } catch (err) {
    console.error("GOOGLE CALLBACK ERROR:", err);
    res.redirect(`${FRONTEND_URL}/?error=auth_failed`);
  }
});

// ── GET /auth/me — Profilo autenticato ───────────────────────────
router.get("/me", protect, (req, res) => {
  return res.json({ ok: true, user: req.user });
});

// ── POST /auth/logout ────────────────────────────────────────────
router.post("/logout", (req, res) => {
  return res.json({ ok: true });
});

router.get("/firstAccess", protect, async (req, res) => {
  try {
    const freelancerId = req.user.id;
    // const services = await Services.findByProfessionalId(freelancerId);
    // const availability = await Availability.findByProfessionalId(freelancerId);

    const { data: servicesData } = await supabase
      .from("bf_services")
      .select("*")
      .eq("professional_id", freelancerId)
      .order("created_at", { ascending: true });

    const { data: availabilityData } =
      await supabase
        .from("bf_availability")
        .select("*")
        .eq("professional_id", freelancerId)
        .order("day_of_week", { ascending: true });

    const isFirstAccess =
      (!servicesData || servicesData.length === 0) &&
      (!availabilityData || availabilityData.length === 0);

    res.json({ ok: true, firstAccess: isFirstAccess });
  } catch (err) {
    console.error("FIRST ACCESS CHECK ERROR:", err);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

module.exports = router;
