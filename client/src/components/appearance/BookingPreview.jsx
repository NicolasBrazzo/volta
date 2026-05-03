import { Clock } from "lucide-react";
import { COLOR_PRESETS } from "@/constants/appearance";
import { cn } from "@/utils/cnFunc";

const MOCK_SERVICES = [
  { name: "Consulenza iniziale", duration_minutes: 30, price: 50, color: "#6366F1" },
  { name: "Sessione completa", duration_minutes: 60, price: 90, color: "#22D3EE" },
  { name: "Follow-up", duration_minutes: 20, price: 30, color: "#10B981" },
];

const Avatar = ({ freelancer, size = "md" }) => {
  const initials = `${freelancer?.first_name?.[0] ?? ""}${freelancer?.last_name?.[0] ?? ""}`.toUpperCase() || "?";
  const base = "rounded-full shrink-0 flex items-center justify-center font-semibold select-none overflow-hidden";
  const sizeClass = size === "sm" ? "w-10 h-10 text-sm" : "w-16 h-16 text-xl";
  return freelancer?.profile_image ? (
    <img src={freelancer.profile_image} alt="" className={cn(base, sizeClass, "object-cover")} />
  ) : (
    <div className={cn(base, sizeClass, "bg-foreground/10 text-foreground")}>
      {initials}
    </div>
  );
};

const ServiceCard = ({ service, primaryColor }) => (
  <div className="bg-background border rounded-xl p-3 flex items-center justify-between gap-3 shadow-sm">
    <div className="flex items-center gap-2 min-w-0">
      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: service.color }} />
      <div className="min-w-0">
        <p className="text-xs font-medium leading-snug truncate">{service.name}</p>
        <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
          <Clock className="w-2.5 h-2.5" />
          {service.duration_minutes} min
        </p>
      </div>
    </div>
    <span className="text-xs font-semibold shrink-0">€{service.price}</span>
  </div>
);

const SidebarLayout = ({ freelancer, services, primaryColor }) => (
  <div style={{ "--primary": primaryColor }} className="bg-muted/30 min-h-full p-3 flex gap-3">
    {/* Sidebar */}
    <div className="w-24 shrink-0 bg-background border rounded-xl p-3 space-y-2 shadow-sm">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <Avatar freelancer={freelancer} size="sm" />
        <div>
          <p className="text-[10px] font-semibold leading-tight line-clamp-2">
            {[freelancer?.first_name, freelancer?.last_name].filter(Boolean).join(" ") || "Nome Cognome"}
          </p>
          {freelancer?.business_name && (
            <p className="text-[9px] text-muted-foreground">{freelancer.business_name}</p>
          )}
        </div>
      </div>
    </div>
    {/* Main */}
    <div className="flex-1 space-y-2">
      <p className="text-[10px] font-semibold">Seleziona un servizio</p>
      {(services ?? MOCK_SERVICES).slice(0, 3).map((s, i) => (
        <ServiceCard key={i} service={s} primaryColor={primaryColor} />
      ))}
    </div>
  </div>
);

const CenteredLayout = ({ freelancer, services, primaryColor }) => (
  <div style={{ "--primary": primaryColor }} className="bg-muted/30 min-h-full p-3 space-y-2">
    {/* Banner orizzontale */}
    <div className="bg-background border rounded-xl p-3 flex items-center gap-3 shadow-sm">
      <Avatar freelancer={freelancer} size="sm" />
      <div>
        <p className="text-[10px] font-semibold leading-tight">
          {[freelancer?.first_name, freelancer?.last_name].filter(Boolean).join(" ") || "Nome Cognome"}
        </p>
        {freelancer?.business_name && (
          <p className="text-[9px] text-muted-foreground">{freelancer.business_name}</p>
        )}
      </div>
    </div>
    {/* Servizi */}
    <p className="text-[10px] font-semibold pt-1">Seleziona un servizio</p>
    {(services ?? MOCK_SERVICES).slice(0, 3).map((s, i) => (
      <ServiceCard key={i} service={s} primaryColor={primaryColor} />
    ))}
  </div>
);

const MinimalLayout = ({ freelancer, services, primaryColor }) => (
  <div style={{ "--primary": primaryColor }} className="bg-background min-h-full p-3 space-y-2">
    {/* Header minimale */}
    <div className="flex items-center gap-2 pb-2 border-b">
      <Avatar freelancer={freelancer} size="sm" />
      <div>
        <p className="text-[10px] font-semibold leading-tight">
          {[freelancer?.first_name, freelancer?.last_name].filter(Boolean).join(" ") || "Nome Cognome"}
        </p>
        {freelancer?.business_name && (
          <p className="text-[9px] text-muted-foreground">{freelancer.business_name}</p>
        )}
      </div>
    </div>
    {/* Servizi senza bordi card */}
    <p className="text-[10px] font-semibold">Seleziona un servizio</p>
    <div className="space-y-1.5">
      {(services ?? MOCK_SERVICES).slice(0, 3).map((s, i) => (
        <div key={i} className="flex items-center gap-2 py-1.5 border-b border-border/50">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
          <span className="text-[10px] font-medium flex-1 truncate">{s.name}</span>
          <span className="text-[10px] text-muted-foreground">€{s.price}</span>
        </div>
      ))}
    </div>
  </div>
);

export const BookingPreview = ({ color, layout, freelancer, services }) => {
  const primaryColor = COLOR_PRESETS.find(c => c.key === color)?.hex ?? COLOR_PRESETS[0].hex;

  const content = layout === "centered"
    ? <CenteredLayout freelancer={freelancer} services={services} primaryColor={primaryColor} />
    : layout === "minimal"
    ? <MinimalLayout freelancer={freelancer} services={services} primaryColor={primaryColor} />
    : <SidebarLayout freelancer={freelancer} services={services} primaryColor={primaryColor} />;

  return (
    <div className="rounded-2xl border shadow-sm overflow-hidden bg-background" style={{ minHeight: 260 }}>
      {/* Fake browser chrome */}
      <div className="bg-muted/50 border-b px-3 py-2 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-border" />
        <span className="w-2 h-2 rounded-full bg-border" />
        <span className="w-2 h-2 rounded-full bg-border" />
        <div className="flex-1 mx-3 bg-background border rounded-md px-2 py-0.5">
          <span className="text-[9px] text-muted-foreground">volta.app/book/il-tuo-link</span>
        </div>
      </div>
      <div className="overflow-hidden" style={{ maxHeight: 280 }}>
        {content}
      </div>
    </div>
  );
};
