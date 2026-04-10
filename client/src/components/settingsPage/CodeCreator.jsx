import { Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useCreateCode } from "@/hooks/useCreateCode";
import { showSuccess } from "@/utils/toast";

export const CodeCreator = () => {
  const { code, isCreating, generateCode } = useCreateCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/book/${code}`);
    showSuccess("Link copiato!");
  };

  return (
    <div className="pt-6 border-t border-border">
      <h2 className="text-lg font-medium mb-1">Creazione codice</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Crea un codice per condividere la tua disponibilità con i clienti.
      </p>

      <div className="flex items-center gap-10">
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={generateCode}
          disabled={isCreating}
        >
          {isCreating ? "Generazione..." : code ? "Rigenera codice" : "Crea il codice"}
        </Button>

        {code && (
          <div className="flex items-center justify-center gap-5">
            <Link
              to={`/book/${code}`}
              className="font-mono text-primary underline-offset-4 hover:underline"
            >
              {code}
            </Link>
            <Copy className="cursor-pointer" onClick={handleCopy} />
          </div>
        )}
      </div>
    </div>
  );
};