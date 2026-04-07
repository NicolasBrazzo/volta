require('dotenv').config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./controllers/auth.controller");
const servicesRoutes = require("./controllers/services.controller");
const availabilityRoutes = require("./controllers/availability.controller");
const bookingsRoutes = require("./controllers/bookings.controller");
const publicRoutes = require("./controllers/public.controller");
const freelancersRoutes = require("./controllers/freelancers.controller");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotte autenticate
app.use("/auth", authRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/freelancers", freelancersRoutes);

// Rotte pubbliche (no auth)
app.use("/api/public", publicRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((req, res) => {
  res.status(404).json({ ok: false, error: "Rotta non trovata" });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ ok: false, error: "Errore interno del server" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend ON at port ${PORT}`);
});
