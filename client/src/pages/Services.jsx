import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import Modal from "@/components/Modal";
import ServiceCard from "@/components/servicePage/ServiceCard";
import ServiceForm from "@/components/servicePage/ServiceForm";
import { useServices } from "@/hooks/useServices";

export const Services = () => {
  const {
    services,
    isLoading,
    isModalOpen,
    editingService,
    formData,
    setFormData,
    isSubmitting,
    openCreate,
    openEdit,
    close,
    handleSubmit,
    handleDelete,
  } = useServices();

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Servizi</h1>
          <p className="text-muted-foreground">
            Cosa offri, quanto dura, quanto costa. Tu decidi, i clienti prenotano.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Nuovo servizio
        </Button>
      </div>

      {services.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
          <p className="text-muted-foreground mb-4">
            Ancora niente da offrire. Aggiungi il tuo primo servizio e sei online.
          </p>
          <Button variant="outline" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Crea il tuo primo servizio
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={close}
        title={editingService ? "Modifica servizio" : "Nuovo servizio"}
      >
        <ServiceForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
};
