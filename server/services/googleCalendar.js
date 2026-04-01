// Google Calendar API v3 integration

const { createOAuth2Client } = require("../config/google");
const Freelancer = require("../models/freelancer.model");

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

// TODO: implementare

// createCalendarEvent(professional, booking, service)
// - Crea un evento nel calendario del professionista
// - Aggiunge clientEmail come attendee
// - Imposta reminder 1 ora prima
// - Salva il googleEventId nella prenotazione
// - Gestisce il refresh del token se scaduto

// deleteCalendarEvent(professional, googleEventId)
// - Cancella l'evento dal calendario

// getCalendarEvents(professional, timeMin, timeMax)
// - Recupera gli eventi dal calendario in un range di date
// - Usato per calcolare gli slot disponibili

module.exports = {
  getAuthenticatedClient,
  // createCalendarEvent,
  // deleteCalendarEvent,
  // getCalendarEvents,
};
