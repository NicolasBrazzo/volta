const express = require("express");
const protect = require("../middleware/auth");
const {
  findByProfessionalId,
  findById,
  deleteById,
} = require("../models/bookings.model");

const router = express.Router();

// GET /api/bookings — Lista prenotazioni (con filtro ?status=)
router.get("/", protect, async (req, res) => {
  try {
    const { status } = req.query;
    const data = await findByProfessionalId(req.user.sub, status || null);
    
    // Se data è null o undefined per qualche motivo, assicuriamo un array
    res.json({ ok: true, data: data || [] });
  } catch (error) {
    console.error(error);
    // Invece di lanciare 500, restituiamo 200 con { ok: false } in modo
    // che il frontend possa gestirlo mostrando lo stato vuoto come richiesto
    res.status(200).json({ ok: false, data: [], error: "Nessun appuntamento trovato o errore nel recupero." });
  }
});

// GET /api/bookings/:id — Dettaglio singola prenotazione
router.get("/:id", protect, async (req, res) => {
  try {
    const data = await findById(req.params.id);

    if (!data) {
      return res
        .status(404)
        .json({ ok: false, error: "Prenotazione non trovata" });
    }

    // Verifica che la prenotazione appartenga all'utente loggato
    if (data.professional_id !== req.user.sub) {
      return res.status(403).json({ ok: false, error: "Accesso negato" });
    }

    res.json({ ok: true, data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, error: "Errore nel recupero della prenotazione" });
  }
});

// DELETE /api/bookings/:id — Cancella prenotazione + evento calendar
router.delete("/:id", protect, async (req, res) => {
  try {
    const booking = await findById(req.params.id);

    if (!booking) {
      return res
        .status(404)
        .json({ ok: false, error: "Prenotazione non trovata" });
    }

    if (booking.professional_id !== req.user.sub) {
      return res.status(403).json({ ok: false, error: "Accesso negato" });
    }

    await deleteById(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, error: "Errore nella cancellazione della prenotazione" });
  }
});

module.exports = router;
