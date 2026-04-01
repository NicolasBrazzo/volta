const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { findByEmail } = require("../models/freelancer.model");
const protect = require("../middleware/auth");

const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = require("../config/jwt");

const router = express.Router();

// POST /auth/login — Login con email e password
// (Temporaneo: verrà sostituito da Google OAuth)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        error: "Email e password sono obbligatorie",
      });
    }

    const freelancer = await findByEmail(email);

    if (!freelancer) {
      return res.status(401).json({
        ok: false,
        error: "Credenziali non valide",
      });
    }

    // TODO: il campo password non esiste ancora in BF_Freelancers
    // Questo login è temporaneo — sarà sostituito dal flusso Google OAuth
    const token = jwt.sign(
      {
        sub: freelancer.id,
        email: freelancer.email,
        slug: freelancer.slug,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({ ok: true, token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      ok: false,
      error: "Errore interno del server",
    });
  }
});

// GET /auth/me — Profilo autenticato
router.get("/me", protect, (req, res) => {
  return res.json({ ok: true, user: req.user });
});

// POST /auth/logout
router.post("/logout", (req, res) => {
  return res.json({ ok: true });
});

module.exports = router;
