import { Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useCreateCode } from "@/hooks/useCreateCode";
import { showSuccess } from "@/utils/toast";

export const CodeCreator = () => {
  const { code, isCreating, generateCode } = useCreateCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/book/${code}`);
    showSuccess("Link copiato. Incollalo dove vuoi.");
  };

  return (
    <div className="pt-6 border-t border-border">
      <h2 className="text-lg font-medium mb-1">Il tuo link personale</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Generalo una volta, condividilo ovunque. È così che i clienti ti trovano.
      </p>

      <div className="flex items-center gap-10">
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={generateCode}
          disabled={isCreating}
        >
          {isCreating ? "Un momento..." : code ? "Rigenera link" : "Crea il mio link"}
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