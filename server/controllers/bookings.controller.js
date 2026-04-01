const express = require("express");
const protect = require("../middleware/auth");

const router = express.Router();

// GET /api/bookings — Lista prenotazioni (con filtro ?status=)
router.get("/", protect, async (req, res) => {
  // TODO: implementare
  res.json({ ok: true, data: [] });
});

// DELETE /api/bookings/:id — Cancella prenotazione + evento calendar
router.delete("/:id", protect, async (req, res) => {
  // TODO: implementare
  res.json({ ok: true });
});

module.exports = router;
