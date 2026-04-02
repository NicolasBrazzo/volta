import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Euro, Pencil, Trash2 } from "lucide-react";

const ServiceCard = ({ service, onEdit, onDelete }) => {
  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span
            className="h-3 w-3 rounded-full shrink-0"
            style={{ backgroundColor: service.color || "#3B82F6" }}
          />
          <h3 className="font-semibold text-card-foreground truncate">{service.name}</h3>
        </div>
        <Badge variant={service.is_active ? "success" : "muted"}>
          {service.is_active ? "Attivo" : "Inattivo"}
        </Badge>
      </div>

      <div className="px-5 py-4 space-y-3">
        {service.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {service.duration_minutes} min
          </span>
          <span className="flex items-center gap-1.5">
            <Euro className="h-3.5 w-3.5" />
            {Number(service.price).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 border-t border-border px-4 py-2.5">
        <Button variant="ghost" size="sm" onClick={() => onEdit(service)}>
          <Pencil className="h-3.5 w-3.5" />
          Modifica
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(service.id)}>
          <Trash2 className="h-3.5 w-3.5" />
          Elimina
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
