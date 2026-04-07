import { Clock, User, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const STATUS_MAP = {
  confirmed: { label: "Confermato", variant: "success" },
  cancelled: { label: "Annullato", variant: "destructive" },
  completed: { label: "Completato", variant: "default" },
};

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();

  const startDate = new Date(booking.date);
  const endDate = new Date(booking.end_date);

  const timeStart = startDate.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const timeEnd = endDate.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const serviceName = booking.BF_Services?.name || "Servizio";
  const serviceColor = booking.BF_Services?.color || "#3B82F6";
  const statusInfo = STATUS_MAP[booking.status] || STATUS_MAP.confirmed;

  return (
    <button
      onClick={() => navigate(`/bookings/${booking.id}`)}
      className="w-full text-left rounded-xl border border-border bg-card p-4 
                 transition-all duration-200 
                 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                 group cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left: info */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Time + service color dot */}
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{ backgroundColor: serviceColor }}
            />
            <span className="text-sm font-semibold text-foreground">
              {timeStart} — {timeEnd}
            </span>
          </div>

          {/* Service name */}
          <p className="text-sm font-medium text-foreground truncate">
            {serviceName}
          </p>

          {/* Client */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span className="truncate">{booking.client_name}</span>
          </div>
        </div>

        {/* Right: status + chevron */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </button>
  );
};

export default BookingCard;
