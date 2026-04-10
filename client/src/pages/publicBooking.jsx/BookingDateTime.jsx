import { useParams, useSearchParams, useNavigate, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProfessionalBySlug, fetchAvailableSlots } from "@/services/publicService";
import { cn } from "@/utils/cnFunc";
import { Loader } from "@/components/Loader";
import { Clock, ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BookingDateTime = () => {
  const { code } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const serviceId = searchParams.get("serviceId");

  const [selectedDate, setSelectedDate] = useState("");

  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ["publicProfile", code],
    queryFn: () => fetchProfessionalBySlug(code),
  });

  const { data: slotsData, isLoading: slotsLoading } = useQuery({
    queryKey: ["slots", code, selectedDate, serviceId],
    queryFn: () => fetchAvailableSlots(code, selectedDate, serviceId),
    enabled: !!selectedDate && !!serviceId,
  });

  if (!serviceId) return <Navigate to={`/book/${code}`} replace />;
  if (profileLoading) return <Loader />;
  if (!profileData?.data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Professionista non trovato.</p>
      </div>
    );
  }

  const { freelancer, services } = profileData.data;
  const service = services.find((s) => s.id === serviceId);

  if (!service) return <Navigate to={`/book/${code}`} replace />;

  const initials =
    `${freelancer.first_name?.[0] ?? ""}${freelancer.last_name?.[0] ?? ""}`.toUpperCase();
  const fullName = [freelancer.first_name, freelancer.last_name].filter(Boolean).join(" ");
  const today = new Date().toISOString().split("T")[0];
  const slots = slotsData?.data ?? [];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

          {/* LEFT — Profilo freelancer */}
          <aside className="w-full md:w-72 md:sticky md:top-10 shrink-0">
            <div className="bg-background border rounded-2xl p-6 space-y-5 shadow-sm">
              <div className="flex flex-col items-center text-center gap-3">
                {freelancer.profile_image ? (
                  <img
                    src={freelancer.profile_image}
                    alt={fullName}
                    className="w-20 h-20 rounded-full object-cover border-2 border-border"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-foreground text-background flex items-center justify-center text-2xl font-semibold tracking-tight select-none">
                    {initials || "?"}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-lg leading-tight">{fullName}</p>
                  {freelancer.business_name && (
                    <p className="text-sm text-muted-foreground mt-0.5">{freelancer.business_name}</p>
                  )}
                </div>
              </div>

              {/* Servizio selezionato */}
              <div className="border-t pt-4 space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Servizio</p>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: service.color }} />
                  <p className="font-medium text-sm">{service.name}</p>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {service.duration_minutes} min — €{Number(service.price).toFixed(2)}
                </p>
              </div>
            </div>
          </aside>

          {/* RIGHT — Selezione data e ora */}
          <main className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon-sm" onClick={() => navigate(`/book/${code}`)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Scegli data e ora</h1>
                <p className="text-sm text-muted-foreground">Seleziona il giorno e l'orario che preferisci.</p>
              </div>
            </div>

            {/* Date picker */}
            <div className="bg-background border rounded-2xl p-5 shadow-sm space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Data
              </label>
              <input
                type="date"
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/30"
              />
            </div>

            {/* Slots */}
            {selectedDate && (
              <div className="space-y-3">
                <h2 className="text-sm font-medium text-muted-foreground">Orari disponibili</h2>
                {slotsLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-6 h-6 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin" />
                  </div>
                ) : slots.length === 0 ? (
                  <div className="bg-background border rounded-2xl p-6 text-center text-muted-foreground text-sm">
                    Nessuno slot disponibile per questa data.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot.start_time}
                        type="button"
                        onClick={() =>
                          navigate(
                            `/book/${code}/details?serviceId=${serviceId}&date=${selectedDate}&time=${slot.start_time}`
                          )
                        }
                        className={cn(
                          "bg-background border rounded-xl py-3 px-2 text-sm font-medium text-center",
                          "transition-all duration-150 shadow-sm",
                          "hover:border-foreground/40 hover:shadow-md",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
                        )}
                      >
                        {slot.start_time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
