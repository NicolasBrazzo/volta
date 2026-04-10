import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProfessionalBySlug } from "@/services/publicService";
import { cn } from "@/utils/cnFunc";
import { Loader } from "@/components/Loader";
import { Clock } from "lucide-react";

export const BookingPublic = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["publicProfile", code],
    queryFn: () => fetchProfessionalBySlug(code),
  });

  if (isLoading) {
    return (
      <Loader/>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-2">
          <p className="text-2xl font-semibold">Pagina non trovata</p>
          <p className="text-muted-foreground text-sm">
            Il link che hai usato non è valido o è scaduto.
          </p>
        </div>
      </div>
    );
  }

  const { freelancer, services } = data.data;

  const initials =
    `${freelancer.first_name?.[0] ?? ""}${freelancer.last_name?.[0] ?? ""}`.toUpperCase();

  const fullName = [freelancer.first_name, freelancer.last_name]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

          {/* LEFT — Profilo freelancer */}
          <aside className="w-full md:w-72 md:sticky md:top-10 shrink-0">
            <div className="bg-background border rounded-2xl p-6 space-y-5 shadow-sm">

              {/* Avatar */}
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
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {freelancer.business_name}
                    </p>
                  )}
                </div>
              </div>

              {/* Divider */}
              {freelancer.description && (
                <>
                  <div className="border-t" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {freelancer.description}
                  </p>
                </>
              )}
            </div>
          </aside>

          {/* RIGHT — Servizi */}
          <main className="flex-1 space-y-4">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold tracking-tight">
                Seleziona un servizio
              </h1>
              <p className="text-sm text-muted-foreground">
                Scegli il tipo di appuntamento che vuoi prenotare.
              </p>
            </div>

            {services.length === 0 ? (
              <div className="bg-background border rounded-2xl p-8 text-center text-muted-foreground text-sm">
                Nessun servizio disponibile al momento.
              </div>
            ) : (
              <div className="space-y-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => navigate(`/book/${code}/date?serviceId=${service.id}`)}
                    className={cn(
                      "w-full text-left bg-background border rounded-2xl p-5",
                      "flex items-center justify-between gap-4",
                      "transition-all duration-150 shadow-sm",
                      "hover:border-foreground/40 hover:shadow-md",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
                    )}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Color dot */}
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: service.color ?? "#6b7280" }}
                      />

                      <div className="min-w-0">
                        <p className="font-medium leading-snug truncate">
                          {service.name}
                        </p>
                        {service.description && (
                          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                            {service.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                          <Clock className="w-4"/>
                          {service.duration_minutes} min
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-base font-semibold">
                        €{Number(service.price).toFixed(2)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};