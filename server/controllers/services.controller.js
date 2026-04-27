const express = require("express");
const { z } = require("zod");
const protect = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const Services = require("../models/services.model");

const router = express.Router();

const createServiceSchema = z.object({
  name: z.string().min(1, "Il nome è obbligatorio").max(100),
  duration_minutes: z.coerce.number().int().positive("La durata deve essere positiva"),
  price: z.coerce.number().min(0, "Il prezzo non può essere negativo"),
  description: z.string().max(500).optional(),
  color: z.string().optional(),
  is_active: z.boolean().optional(),
});

const updateServiceSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  duration_minutes: z.coerce.number().int().positive().optional(),
  price: z.coerce.number().min(0).optional(),
  description: z.string().max(500).optional(),
  color: z.string().optional(),
  is_active: z.boolean().optional(),
}).refine((data) => Object.keys(data).length > 0, { message: "Nessun campo da aggiornare" });

// GET /api/services — Lista servizi del professionista
router.get("/", protect, async (req, res) => {
  try {
    const services = await Services.findByProfessionalId(req.user.sub);
    res.json({ ok: true, data: services });
  } catch (err) {
    console.error("GET SERVICES ERROR:", err);
    res.status(500).json({ ok: false, error: "Errore recupero servizi" });
  }
});

// POST /api/services — Crea servizio
router.post("/", protect, validate(createServiceSchema), async (req, res) => {
  try {
    const service = await Services.create({
      ...req.body,
      professional_id: req.user.sub,
    });
    res.status(201).json({ ok: true, data: service });
  } catch (err) {
    console.error("CREATE SERVICE ERROR:", err);
    res.status(500).json({ ok: false, error: "Errore creazione servizio" });
  }
});

// PUT /api/services/:id — Modifica servizio
router.put("/:id", protect, validate(updateServiceSchema), async (req, res) => {
  try {
    const existing = await Services.findById(req.params.id);
    if (!existing || existing.professional_id !== req.user.sub) {
      return res.status(404).json({ ok: false, error: "Servizio non trovato" });
    }
    const  updated= await Services.updateById(req.params.id, req.body);
    res.json({ ok: true, data: updated });
  } catch (err) {
    console.error("UPDATE SERVICE ERROR:", err);
    res.status(500).json({ ok: false, error: "Errore aggiornamento servizio" });
  }
});

// DELETE /api/services/:id — Elimina servizio
router.delete("/:id", protect, async (req, res) => {
  try {
    const existing = await Services.findById(req.params.id);
    if (!existing || existing.professional_id !== req.user.sub) {
      return res.status(404).json({ ok: false, error: "Servizio non trovato" });
    }
    await Services.deleteById(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.error("DELETE SERVICE ERROR:", err);
    res.status(500).json({ ok: false, error: "Errore eliminazione servizio" });
  }
});

module.exports = router;
