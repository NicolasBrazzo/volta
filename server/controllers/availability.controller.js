const express = require("express");
const protect = require("../middleware/auth");

const router = express.Router();

// GET /api/availability — Ritorna disponibilità settimanale
router.get("/", protect, async (req, res) => {
  // TODO: implementare
  res.json({ ok: true, data: [] });
});

// PUT /api/availability — Aggiorna disponibilità (body: array di 7 giorni)
router.put("/", protect, async (req, res) => {
  // TODO: implementare
  res.json({ ok: true, data: [] });
});

module.exports = router;
