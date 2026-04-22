import { useParams, useSearchParams, useNavigate, Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProfessionalBySlug, createBooking } from "@/services/publicService";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { showError } from "@/utils/toast";
import { ArrowLeft, Clock, Calendar as CalendarIcon, Clock3, User, Mail, Phone, FileText } from "lucide-react";

export const BookingDetails = () => {
  const { code } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const serviceId = searchParams.get("serviceId");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  const [form, setForm] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    notes: "",
  });

  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ["publicProfile", code],
    queryFn: () => fetchProfessionalBySlug(code),
  });

  const bookingMutation = useMutation({
    mutationFn: (payload) => createBooking(code, payload),
    onSuccess: () => {
      navigate(
        `/book/${code}/confirmation?date=${date}&time=${time}&name=${encodeURIComponent(form.client_name.trim())}`
      );
    },
    onError: (err) => {
      const status = err?.response?.status;
      if (status === 409) {
        showError("Slot non più disponibile. Seleziona un altro orario.");
      } else {
        showError("Errore durante la prenotazione. Riprova.");
      }
    },
  });

  if (!serviceId || !date || !time) return <Navigate to={`/book/${code}`} replace />;
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

  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.client_name.trim() || !form.client_email.trim()) {
      return showError("Nome e email sono obbligatori");
    }
    bookingMutation.mutate({
      service_id: serviceId,
      date,
      start_time: time,
      client_name: form.client_name,
      client_email: form.client_email,
      client_phone: form.client_phone || undefined,
      notes: form.notes || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

          {/* LEFT — Profilo + riepilogo */}
          <aside className="w-full md:w-72 md:sticky md:top-10 shrink-0 space-y-4">
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

              {/* Riepilogo prenotazione */}
              <div className="border-t pt-4 space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Riepilogo</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: service.color }} />
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span className="capitalize">{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock3 className="w-3.5 h-3.5" />
                    <span>{time} — {service.duration_minutes} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>€{Number(service.price).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT — Form dati cliente */}
          <main className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => navigate(`/book/${code}/date?serviceId=${serviceId}`)}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">I tuoi dati</h1>
                <p className="text-sm text-muted-foreground">Inserisci le informazioni per completare la prenotazione.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-background border rounded-2xl p-6 shadow-sm space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="client_name" className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                  Nome completo *
                </Label>
                <Input
                  id="client_name"
                  name="client_name"
                  value={form.client_name}
                  onChange={handleChange}
                  placeholder="Mario Rossi"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="client_email" className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  Email *
                </Label>
                <Input
                  id="client_email"
                  name="client_email"
                  type="email"
                  value={form.client_email}
                  onChange={handleChange}
                  placeholder="mario@esempio.it"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="client_phone" className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                  Telefono
                </Label>
                <Input
                  id="client_phone"
                  name="client_phone"
                  type="tel"
                  value={form.client_phone}
                  onChange={handleChange}
                  placeholder="+39 333 1234567"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="notes" className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                  Note
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Indicazioni aggiuntive per il professionista..."
                  maxLength={500}
                  rows={3}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={bookingMutation.isPending}>
                {bookingMutation.isPending ? "Prenotazione in corso..." : "Conferma prenotazione"}
              </Button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};
