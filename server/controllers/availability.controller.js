const express = require("express");
const { z } = require("zod");
const protect = require("../middleware/auth");
const { findByProfessionalId, upsert } = require("../models/availability.model");

const router = express.Router();

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
const availabilitySchema = z.array(
  z.object({
    day_of_week: z.coerce.number().int().min(0).max(6),
    start_time: z.string().regex(timeRegex, "Formato HH:MM richiesto per start_time"),
    end_time: z.string().regex(timeRegex, "Formato HH:MM richiesto per end_time"),
    is_active: z.boolean(),
  }).refine((d) => d.start_time < d.end_time, { message: "start_time deve essere prima di end_time" })
).min(1, "Array disponibilità non può essere vuoto");

// GET /api/availability — Ritorna disponibilità settimanale
router.get("/", protect, async (req, res) => {
  try {
    const data = await findByProfessionalId(req.user.sub);
    res.json({ ok: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Errore nel recupero della disponibilità" });
  }
});

// PUT /api/availability — Aggiorna disponibilità (body: array di 7 giorni)
router.put("/", protect, async (req, res) => {
  try {
    const parsed = availabilitySchema.safeParse(req.body);
    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message || "Dati non validi";
      return res.status(400).json({ ok: false, error: message });
    }

    // Assicura che ogni record abbia il professional_id corretto (quello in sessione)
    const dataToSave = parsed.data.map((item) => ({
      professional_id: req.user.sub,
      day_of_week: item.day_of_week,
      start_time: item.start_time,
      end_time: item.end_time,
      is_active: item.is_active,
    }));

    const data = await upsert(dataToSave);
    res.json({ ok: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Errore nel salvataggio della disponibilità" });
  }
});

module.exports = router;
