import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBookings } from "../services/bookingsService";
import { Loader } from "@/components/Loader";
import BookingCard from "@/components/booking/BookingCard";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/Home2/useReveal";

// ---------- helpers ----------

const MONTH_NAMES = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre",
];

const DAY_LABELS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

/** Returns a date string "YYYY-MM-DD" in local timezone */
const toDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/** Group bookings by local date key */
const groupByDate = (bookings) => {
  const map = {};
  for (const b of bookings) {
    const key = toDateKey(new Date(b.date));
    if (!map[key]) map[key] = [];
    map[key].push(b);
  }
  // sort each day by time
  for (const key of Object.keys(map)) {
    map[key].sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  return map;
};

/** Get capacity color class based on number of bookings */
const getCapacityColor = (count) => {
  if (count === 0) return "";
  if (count <= 2) return "bg-green-400/25 text-green-700 dark:text-green-400";
  if (count <= 5) return "bg-yellow-400/25 text-yellow-700 dark:text-yellow-400";
  return "bg-red-400/25 text-red-700 dark:text-red-400";
};

/** Get capacity dot color */
const getDotColor = (count) => {
  if (count === 0) return "";
  if (count <= 2) return "bg-green-500";
  if (count <= 5) return "bg-yellow-500";
  return "bg-red-500";
};

/** Build array of day cells for the calendar grid */
const buildCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  // getDay(): 0=Sun, we want Mon=0
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];

  // empty cells before first day
  for (let i = 0; i < startDow; i++) {
    cells.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }

  return cells;
};

// ---------- component ----------

export const Bookings = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(toDateKey(today));
  useReveal();

  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => fetchBookings(),
  });

  const bookings = data?.data || [];
  const grouped = useMemo(() => groupByDate(bookings), [bookings]);
  const calendarDays = useMemo(
    () => buildCalendarDays(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const selectedBookings = grouped[selectedDate] || [];

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(toDateKey(today));
  };

  if (isLoading) return <Loader />;

  // Render empty state if there are no bookings at all
  if (bookings.length === 0) {
    return (
      <div className="p-6 space-y-6">
        <div className="h2-reveal">
          <p className="text-[11px] font-bold text-primary-300 uppercase tracking-[0.08em] mb-2">Il tuo calendario</p>
          <h1><span className="volta-gradient-text">Prenotazioni</span></h1>
          <p className="text-muted-foreground mt-2">
            Qui trovi tutti i tuoi appuntamenti. Ordinati, sincronizzati, sempre aggiornati.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 bg-card/50 h2-reveal h2-reveal-delay-1">
          <CalendarDays className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-medium mb-2">Ancora tutto da scrivere</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            {data?.error || "Non ci sono prenotazioni, per ora. Condividi il tuo link personale e lascia che arrivino da sole."}
          </p>
        </div>
      </div>
    );
  }

  // Format the selected date for display
  const selParts = selectedDate.split("-");
  const selDateObj = new Date(+selParts[0], +selParts[1] - 1, +selParts[2]);
  const selectedLabel = selDateObj.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-6 space-y-6">
      <div className="h2-reveal">
        <p className="text-[11px] font-bold text-primary-300 uppercase tracking-[0.08em] mb-2">Il tuo calendario</p>
        <h1><span className="volta-gradient-text">Prenotazioni</span></h1>
        <p className="text-muted-foreground mt-2">
          Il tuo calendario, senza doppie prenotazioni e senza WhatsApp a mezzanotte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(320px,420px)_1fr] gap-6">
        {/* ==================== LEFT: CALENDAR ==================== */}
        <div className="bg-card border border-border rounded-xl shadow-sm p-5 h-fit h2-reveal h2-reveal-delay-1">
          {/* Header: month nav */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-lg">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </h2>
              <button
                onClick={goToToday}
                className="text-xs text-primary hover:underline ml-1"
              >
                Oggi
              </button>
            </div>

            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAY_LABELS.map((d) => (
              <div
                key={d}
                className="text-center text-xs font-medium text-muted-foreground py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, idx) => {
              if (!date) {
                return <div key={`empty-${idx}`} className="aspect-square" />;
              }

              const key = toDateKey(date);
              const count = (grouped[key] || []).length;
              const isToday = key === toDateKey(today);
              const isSelected = key === selectedDate;
              const capacityClass = getCapacityColor(count);
              const dotColor = getDotColor(count);

              return (
                <button
                  key={key}
                  onClick={() => setSelectedDate(key)}
                  className={`
                    aspect-square rounded-lg flex flex-col items-center justify-center 
                    text-sm font-medium transition-all duration-150 relative
                    ${isSelected
                      ? "bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/30"
                      : isToday
                        ? "ring-1 ring-primary/40 " + capacityClass
                        : capacityClass || "hover:bg-muted text-foreground"
                    }
                  `}
                >
                  <span>{date.getDate()}</span>
                  {count > 0 && !isSelected && (
                    <span
                      className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${dotColor}`}
                    />
                  )}
                  {count > 0 && isSelected && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-5 pt-4 border-t border-border text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> 1-2
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> 3-5
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> 6+
            </span>
          </div>
        </div>

        {/* ==================== RIGHT: DAY LIST ==================== */}
        <div className="space-y-4 h2-reveal h2-reveal-delay-2">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold capitalize">{selectedLabel}</h2>
          </div>

          {selectedBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 bg-card">
              <CalendarDays className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground text-sm">
                Giornata libera. Goditela.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
