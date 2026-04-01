const express = require("express");

const router = express.Router();

// GET /api/public/:slug — Info professionista + servizi attivi
router.get("/:slug", async (req, res) => {
  // TODO: implementare
  res.json({ ok: true, data: null });
});

// GET /api/public/:slug/slots?date=YYYY-MM-DD&serviceId=xxx — Slot disponibili
router.get("/:slug/slots", async (req, res) => {
  // TODO: implementare
  res.json({ ok: true, data: [] });
});

// POST /api/public/:slug/book — Crea prenotazione
router.post("/:slug/book", async (req, res) => {
  // TODO: implementare
  res.status(201).json({ ok: true, data: null });
});

module.exports = router;
