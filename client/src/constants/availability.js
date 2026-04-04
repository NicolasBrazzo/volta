export const DAYS_OF_WEEK = [
  { id: 1, label: "Lunedì" },
  { id: 2, label: "Martedì" },
  { id: 3, label: "Mercoledì" },
  { id: 4, label: "Giovedì" },
  { id: 5, label: "Venerdì" },
  { id: 6, label: "Sabato" },
  { id: 0, label: "Domenica" },
];

export const DEFAULT_AVAILABILITY = DAYS_OF_WEEK.map((day) => ({
  day_of_week: day.id,
  is_active: day.id >= 1 && day.id <= 5, // L-V attivi, S-D inattivi
  start_time: "09:00",
  end_time: "18:00",
}));