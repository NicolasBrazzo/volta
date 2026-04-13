import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, Clock, User, Mail, Phone, FileText, Trash2 } from "lucide-react";
import { fetchBookingById, deleteBooking } from "../services/bookingsService";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { showSuccess, showError } from "@/utils/toast";

const STATUS_MAP = {
  confirmed: { label: "Confermato", variant: "success" },
  cancelled: { label: "Annullato", variant: "destructive" },
  completed: { label: "Completato", variant: "default" },
};

export const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => fetchBookingById(id),
  });

  const deleteMutation = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      showSuccess("Prenotazione annullata con successo");
      queryClient.invalidateQueries(["bookings"]);
      navigate("/bookings");
    },
    onError: () => {
      showError("Errore durante l'annullamento della prenotazione");
    },
  });

  if (isLoading) return <Loader />;

  if (error || !data?.data) {
    return (
      <div className="p-6">
        <Button variant="ghost" onClick={() => navigate("/bookings")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Torna alle prenotazioni
        </Button>
        <div className="flex flex-col items-center justify-center py-12 text-center bg-card rounded-xl border border-border">
          <h2 className="text-xl font-semibold mb-2">Prenotazione non trovata</h2>
          <p className="text-muted-foreground">La prenotazione che stavi cercando non esiste o non vi hai più accesso.</p>
        </div>
      </div>
    );
  }

  const booking = data.data;
  console.log("BOOKING", booking);
  const startDate = new Date(booking.date);
  const endDate = new Date(booking.end_date);
  
  const dateFormatted = startDate.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const timeStart = startDate.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
  
  const timeEnd = endDate.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const service = booking.bf_services || {};
  console.log("SERVICE", service);
  const statusInfo = STATUS_MAP[booking.status] || STATUS_MAP.confirmed;

  const handleDelete = () => {
    if (window.confirm("Sei sicuro di voler annullare e cancellare questa prenotazione? L'operazione è irreversibile.")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <Button variant="ghost" onClick={() => navigate("/bookings")} className="mb-4 -ml-4 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Torna alle prenotazioni
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">Dettaglio Prenotazione</h1>
          <Badge variant={statusInfo.variant} className="w-fit text-sm px-3 py-1">
            {statusInfo.label}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Box Servizio & Orari */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-3">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: service.color || "#3B82F6" }} />
            {service.name || "Servizio rimosso"}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CalendarDays className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Data appuntamento</p>
                <p className="text-muted-foreground capitalize">{dateFormatted}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Orario</p>
                <p className="text-muted-foreground">{timeStart} — {timeEnd} ({service.duration_minutes || '?'} min)</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border flex justify-between items-center">
              <span className="font-medium text-muted-foreground">Prezzo pattuito:</span>
              <span className="text-lg font-semibold">€ {Number(booking.price_booking || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Box Cliente */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold border-b border-border pb-3">Dettagli Cliente</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Nome</p>
                <p className="text-muted-foreground">{booking.client_name}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Indirizzo Email</p>
                <a href={`mailto:${booking.client_email}`} className="text-primary hover:underline">{booking.client_email}</a>
              </div>
            </div>
            
            {booking.client_phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Telefono</p>
                  <a href={`tel:${booking.client_phone}`} className="text-primary hover:underline">{booking.client_phone}</a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Box Note (se presenti, a larghezza intera) */}
        {booking.notes && (
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-4 md:col-span-2 md:mt-2">
            <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              Note del cliente
            </h2>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed bg-muted/30 p-4 rounded-lg">
              {booking.notes}
            </p>
          </div>
        )}
      </div>

      {/* Zona Azioni Pericolose */}
      <div className="mt-8 pt-6 border-t border-border flex justify-end">
        <Button 
          variant="destructive" 
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          {deleteMutation.isPending ? "Cancellazione..." : "Annulla ed elimina prenotazione"}
        </Button>
      </div>

    </div>
  );
};
