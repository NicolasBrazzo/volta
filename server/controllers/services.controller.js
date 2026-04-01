const express = require("express");
const protect = require("../middleware/auth");

const router = express.Router();

// GET /api/services — Lista servizi del professionista
router.get("/", protect, async (req, res) => {
  // TODO: implementare
  res.json({ ok: true, data: [] });
});

// POST /api/services — Crea servizio
router.post("/", protect, async (req, res) => {
  // TODO: implementare
  res.status(201).json({ ok: true, data: null });
});

// PUT /api/services/:id — Modifica servizio
router.put("/:id", protect, async (req, res) => {
  // TODO: implementare
  res.json({ ok: true, data: null });
});

// DELETE /api/services/:id — Elimina servizio
router.delete("/:id", protect, async (req, res) => {
  // TODO: implementare
  res.json({ ok: true });
});

module.exports = router;
