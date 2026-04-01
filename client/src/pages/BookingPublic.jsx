import { useParams } from "react-router-dom";

export const BookingPublic = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Prenota un appuntamento
        </h1>
        <p className="text-muted-foreground">
          Pagina di prenotazione per <span className="font-medium text-foreground">{slug}</span>
        </p>
      </div>
    </div>
  );
};
