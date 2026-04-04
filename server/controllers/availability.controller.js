const express = require("express");
const protect = require("../middleware/auth");
const { findByProfessionalId, upsert } = require("../models/availability.model");

const router = express.Router();

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
    const availabilityData = req.body;
    
    if (!Array.isArray(availabilityData)) {
      return res.status(400).json({ ok: false, error: "Formato dati non valido" });
    }

    // Assicura che ogni record abbia il professional_id corretto (quello in sessione)
    const dataToSave = availabilityData.map((item) => ({
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
