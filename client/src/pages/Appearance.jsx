import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { fetchProfessionalBySlug } from "@/services/publicService";
import { saveAppearance } from "@/services/appearanceService";
import { COLOR_PRESETS, LAYOUT_PRESETS, DEFAULT_COLOR, DEFAULT_LAYOUT } from "@/constants/appearance";
import { BookingPreview } from "@/components/appearance/BookingPreview";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { showError, showSuccess } from "@/utils/toast";
import { cn } from "@/utils/cnFunc";
import { Palette, LayoutTemplate, Check } from "lucide-react";

export const Appearance = () => {
  const { user, updateUser } = useAuth();
  const code = user?.unique_freelance_code;

  const { data, isLoading } = useQuery({
    queryKey: ["publicProfile", code],
    queryFn: () => fetchProfessionalBySlug(code),
    enabled: !!code,
  });

  const freelancer = data?.data?.freelancer;
  const services = data?.data?.services;

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState(null);

  const currentColor = selectedColor ?? freelancer?.booking_page_color ?? DEFAULT_COLOR;
  const currentLayout = selectedLayout ?? freelancer?.booking_page_layout ?? DEFAULT_LAYOUT;

  const mutation = useMutation({
    mutationFn: () => saveAppearance(user.id, {
      booking_page_color: currentColor,
      booking_page_layout: currentLayout,
    }),
    onSuccess: (res) => {
      updateUser({
        booking_page_color: currentColor,
        booking_page_layout: currentLayout,
      });
      showSuccess("Aspetto salvato!");
    },
    onError: () => showError("Errore durante il salvataggio. Riprova."),
  });

  if (isLoading) return <Loader />;

  if (!code) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center space-y-2">
        <p className="font-semibold">Link di prenotazione non ancora creato</p>
        <p className="text-sm text-muted-foreground">
          Vai in Impostazioni per creare il tuo link, poi personalizza l'aspetto.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      <div>
        <h1 className="volta-gradient-text">Aspetto</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Personalizza l'aspetto della tua pagina di prenotazione pubblica.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* Controlli */}
        <div className="space-y-8">

          {/* Colore principale */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold">Colore principale</h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {COLOR_PRESETS.map((preset) => {
                const isSelected = currentColor === preset.key;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => setSelectedColor(preset.key)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-150",
                      isSelected
                        ? "border-foreground bg-foreground/5 shadow-sm"
                        : "border-border hover:border-foreground/30"
                    )}
                  >
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: preset.hex }}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" strokeWidth={2.5} />}
                    </span>
                    <span className="text-xs text-muted-foreground">{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Layout */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-base font-semibold">Layout</h2>
            </div>
            <div className="space-y-3">
              {LAYOUT_PRESETS.map((preset) => {
                const isSelected = currentLayout === preset.key;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => setSelectedLayout(preset.key)}
                    className={cn(
                      "w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all duration-150",
                      isSelected
                        ? "border-foreground bg-foreground/5 shadow-sm"
                        : "border-border hover:border-foreground/30"
                    )}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{preset.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{preset.description}</p>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          <Button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="w-full"
          >
            {mutation.isPending ? "Salvataggio..." : "Salva aspetto"}
          </Button>
        </div>

        {/* Anteprima */}
        <div className="space-y-3 lg:sticky lg:top-6">
          <p className="text-sm font-medium text-muted-foreground">Anteprima</p>
          <BookingPreview
            color={currentColor}
            layout={currentLayout}
            freelancer={freelancer}
            services={services}
          />
          <p className="text-xs text-muted-foreground text-center">
            L'anteprima mostra la prima schermata della pagina di prenotazione.
          </p>
        </div>
      </div>
    </div>
  );
};
