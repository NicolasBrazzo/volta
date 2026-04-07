import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ServiceForm = ({ formData, onChange, onSubmit, isSubmitting }) => {
  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    onChange((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Nome *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={handleChange("name")}
          placeholder="es. Taglio capelli"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Descrizione</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={handleChange("description")}
          placeholder="Descrivi il servizio..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="duration_minutes">Durata (min) *</Label>
          <Input
            id="duration_minutes"
            type="number"
            min="1"
            value={formData.duration_minutes}
            onChange={handleChange("duration_minutes")}
            placeholder="30"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="price">Prezzo (&euro;) *</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange("price")}
            placeholder="25.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="color">Colore</Label>
          <div className="flex items-center gap-2">
            <input
              id="color"
              type="color"
              value={formData.color}
              onChange={handleChange("color")}
              className="h-9 w-9 cursor-pointer rounded-md border border-input p-0.5"
            />
            <span className="text-sm text-muted-foreground">{formData.color}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="is_active">Stato</Label>
          <label className="flex items-center gap-2 h-9 cursor-pointer">
            <input
              id="is_active"
              type="checkbox"
              checked={formData.is_active}
              onChange={handleChange("is_active")}
              className="h-4 w-4 rounded border-input accent-primary"
            />
            <span className="text-sm">Attivo</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvataggio..." : "Salva"}
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
