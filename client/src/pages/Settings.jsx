import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export const Settings = () => {
  const { logout } = useAuth();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Impostazioni</h1>
      <p className="text-muted-foreground">
        Gestisci il tuo profilo e le impostazioni del tuo account.
      </p>

      <Button
        variant="outline"
        onClick={() => logout()}
        className="w-full h-11 gap-3 text-sm font-medium"
      >
        Logout
      </Button>
    </div>
  );
};
