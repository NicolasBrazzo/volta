import { BUSINESS_TYPES } from "@/constants/businessTypes";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { useCreateFreelanceProfile } from "@/hooks/useCreateFreelanceProfile";

export const CreateFreelanceProfile = () => {
  const {
    profile,
    service,
    onProfileChange,
    onServiceChange,
    isSubmitting,
    isLoading,
    handleSubmit,
  } = useCreateFreelanceProfile();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Configura il tuo profilo
          </h1>
          <p className="mt-2 text-muted-foreground">
            Inserisci le informazioni della tua attività e crea il tuo primo
            servizio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Sezione Profilo */}
          <div className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Informazioni attività</h2>

            <div className="space-y-2">
              <Label htmlFor="business_name">
                Nome attività <span className="text-destructive">*</span>
              </Label>
              <Input
                id="business_name"
                placeholder="Es. Studio Mario Rossi"
                value={profile.business_name}
                onChange={(e) => onProfileChange("business_name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrizione</Label>
              <Textarea
                id="description"
                placeholder="Descrivi brevemente la tua attività..."
                rows={3}
                value={profile.description}
                onChange={(e) => onProfileChange("description", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="business_type">Tipologia di attività</Label>
              <Select
                id="business_type"
                value={profile.business_type}
                onChange={(e) => onProfileChange("business_type", e.target.value)}
              >
                <option value="">Seleziona una tipologia</option>
                {BUSINESS_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Sezione Servizio */}
          <div className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Il tuo primo servizio</h2>
            <p className="text-sm text-muted-foreground">
              Crea almeno un servizio che i tuoi clienti potranno prenotare.
            </p>

            <div className="space-y-2">
              <Label htmlFor="service_name">
                Nome servizio <span className="text-destructive">*</span>
              </Label>
              <Input
                id="service_name"
                placeholder="Es. Consulenza base"
                value={service.name}
                onChange={(e) => onServiceChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service_description">Descrizione servizio</Label>
              <Textarea
                id="service_description"
                placeholder="Descrivi il servizio offerto..."
                rows={2}
                value={service.description}
                onChange={(e) => onServiceChange("description", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">
                  Durata (minuti) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="5"
                  step="5"
                  placeholder="30"
                  value={service.duration_minutes}
                  onChange={(e) => onServiceChange("duration_minutes", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">
                  Prezzo (€) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="50.00"
                  value={service.price}
                  onChange={(e) => onServiceChange("price", e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader size="sm" /> : "Completa configurazione"}
          </Button>
        </form>
      </div>
    </div>
  );
};