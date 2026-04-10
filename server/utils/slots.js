const Availability = require("../models/availability.model");
const Booking = require("../models/bookings.model");

const SLOT_STEP_MINUTES = 30;

const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const minutesToTime = (minutes) => {
  const h = String(Math.floor(minutes / 60)).padStart(2, "0");
  const m = String(minutes % 60).padStart(2, "0");
  return `${h}:${m}`;
};

/**
 * Calcola gli slot disponibili per un professionista in una data specifica.
 *
 * La tabella bf_bookings usa campi timestamptz:
 *   - date     (inizio appuntamento)
 *   - end_date (fine appuntamento)
 *
 * @returns {Array<{ start_time: string, end_time: string }>} slot in formato "HH:MM"
 */
const calculateAvailableSlots = async (professionalId, dateString, service) => {
  const date = new Date(dateString + "T00:00:00");
  const dayOfWeek = date.getDay();

  const availability = await Availability.findByDay(professionalId, dayOfWeek);
  if (!availability || !availability.is_active) return [];

  // findByDateRange filtra per date >= startDate e date <= endDate
  // Passiamo inizio e fine giornata come timestamptz
  const dayStart = `${dateString}T00:00:00`;
  const dayEnd = `${dateString}T23:59:59`;
  const bookings = await Booking.findByDateRange(professionalId, dayStart, dayEnd);

  const startMin = timeToMinutes(availability.start_time);
  const endMin = timeToMinutes(availability.end_time);
  const duration = service.duration_minutes;

  // Generate candidate slots
  const candidates = [];
  for (let cursor = startMin; cursor + duration <= endMin; cursor += SLOT_STEP_MINUTES) {
    candidates.push({ start: cursor, end: cursor + duration });
  }

  // Map existing bookings (timestamptz) to minutes-of-day
  const bookedRanges = bookings.map((b) => {
    const bStart = new Date(b.date);
    const bEnd = new Date(b.end_date);
    return {
      start: bStart.getHours() * 60 + bStart.getMinutes(),
      end: bEnd.getHours() * 60 + bEnd.getMinutes(),
    };
  });

  // Filter out overlapping slots
  const free = candidates.filter((slot) =>
    !bookedRanges.some((b) => slot.start < b.end && slot.end > b.start)
  );

  // If today, filter out past slots
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  if (dateString === todayStr) {
    const nowMin = now.getHours() * 60 + now.getMinutes();
    return free
      .filter((slot) => slot.start > nowMin)
      .map((slot) => ({ start_time: minutesToTime(slot.start), end_time: minutesToTime(slot.end) }));
  }

  return free.map((slot) => ({
    start_time: minutesToTime(slot.start),
    end_time: minutesToTime(slot.end),
  }));
};

module.exports = { calculateAvailableSlots };
