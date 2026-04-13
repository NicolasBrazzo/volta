// Google Calendar API v3 integration

const { google } = require("googleapis");
const { createOAuth2Client } = require("../config/google");
const Freelancer = require("../models/freelancer.model");
const Booking = require("../models/bookings.model");

// Crea un client OAuth2 autenticato con i token del freelancer.
// Gestisce automaticamente il refresh del token.
function getAuthenticatedClient(freelancer) {
  const oauth2Client = createOAuth2Client();

  oauth2Client.setCredentials({
    access_token: freelancer.google_access_token,
    refresh_token: freelancer.google_refresh_token,
  });

  // Quando Google rinnova automaticamente l'access_token, lo salviamo in DB
  oauth2Client.on("tokens", async (tokens) => {
    if (tokens.access_token) {
      try {
        await Freelancer.updateById(freelancer.id, {
          google_access_token: tokens.access_token,
        });
      } catch (err) {
        console.error("Failed to persist refreshed access token:", err);
      }
    }
  });

  return oauth2Client;
}

// Crea un evento nel calendario del professionista per una prenotazione.
// Salva il google_event_id restituito dall'API nel record bf_bookings.
async function createCalendarEvent(professional, booking, service) {
  const auth = getAuthenticatedClient(professional);
  const calendar = google.calendar({ version: "v3", auth });

  const calendarId = professional.calendar_id || "primary";

  const description = [
    `Cliente: ${booking.client_name}`,
    `Email: ${booking.client_email}`,
    booking.client_phone ? `Telefono: ${booking.client_phone}` : null,
    booking.notes ? `Note: ${booking.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const event = {
    summary: service.name,
    description,
    start: {
      dateTime: new Date(booking.date).toISOString(),
      timeZone: "Europe/Rome",
    },
    end: {
      dateTime: new Date(booking.end_date).toISOString(),
      timeZone: "Europe/Rome",
    },
    attendees: [{ email: booking.client_email }],
    reminders: {
      useDefault: false,
      overrides: [{ method: "email", minutes: 60 }],
    },
  };

  const { data } = await calendar.events.insert({
    calendarId,
    requestBody: event,
    sendUpdates: "all",
  });

  await Booking.updateById(booking.id, { google_event_id: data.id });

  return data.id;
}

// Cancella un evento dal calendario del professionista.
// Ignora silenziosamente il 404 (evento gia rimosso/manualmente cancellato).
async function deleteCalendarEvent(professional, google_event_id) {
  if (!google_event_id) return;

  const auth = getAuthenticatedClient(professional);
  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = professional.calendar_id || "primary";

  try {
    await calendar.events.delete({
      calendarId,
      eventId: google_event_id,
      sendUpdates: "all",
    });
  } catch (err) {
    if (err?.code === 404 || err?.response?.status === 404) {
      return;
    }
    throw err;
  }
}

// Recupera gli eventi del calendario nel range [timeMin, timeMax].
// Restituisce array di { start, end } in ISO 8601.
async function getCalendarEvents(professional, timeMin, timeMax) {
  const auth = getAuthenticatedClient(professional);
  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = professional.calendar_id || "primary";

  const { data } = await calendar.events.list({
    calendarId,
    timeMin: new Date(timeMin).toISOString(),
    timeMax: new Date(timeMax).toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  return (data.items || [])
    .filter((e) => e.start?.dateTime && e.end?.dateTime)
    .map((e) => ({ start: e.start.dateTime, end: e.end.dateTime }));
}

module.exports = {
  getAuthenticatedClient,
  createCalendarEvent,
  deleteCalendarEvent,
  getCalendarEvents,
};
