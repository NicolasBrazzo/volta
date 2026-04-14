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
            Benvenuto su Volta.
          </h1>
          <p className="mt-2 text-muted-foreground">
            Due minuti e sei online. Parti dalle basi: chi sei e cosa offri.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Sezione Profilo */}
          <div className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">La tua attività</h2>

            <div className="space-y-2">
              <Label htmlFor="business_name">
                Come ti presenti <span className="text-destructive">*</span>
              </Label>
              <Input
                id="business_name"
                placeholder="Es. Studio Mario Rossi"
                value={profile.business_name}
                onChange={(e) => onProfileChange("business_name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Due righe su di te</Label>
              <Textarea
                id="description"
                placeholder="Raccontami cosa fai, come lo fai, e perché ti scelgono."
                rows={3}
                value={profile.description}
                onChange={(e) => onProfileChange("description", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="business_type">Che lavoro fai</Label>
              <Select
                id="business_type"
                value={profile.business_type}
                onChange={(e) => onProfileChange("business_type", e.target.value)}
              >
                <option value="">Scegli la tua categoria</option>
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
              Aggiungi almeno un servizio prenotabile. Potrai crearne altri quando vuoi.
            </p>

            <div className="space-y-2">
              <Label htmlFor="service_name">
                Nome del servizio <span className="text-destructive">*</span>
              </Label>
              <Input
                id="service_name"
                placeholder="Es. Consulenza iniziale"
                value={service.name}
                onChange={(e) => onServiceChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service_description">Cosa include</Label>
              <Textarea
                id="service_description"
                placeholder="Cosa trova il cliente quando prenota questo servizio?"
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
            {isSubmitting ? <Loader size="sm" /> : "Entra in Volta"}
          </Button>
        </form>
      </div>
    </div>
  );
};