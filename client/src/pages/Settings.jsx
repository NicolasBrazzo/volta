import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useThemeContext } from "@/context/ThemeContext";
import { Sun, Moon, Laptop } from "lucide-react";

export const Settings = () => {
  const { logout } = useAuth();
  const { theme, setTheme } = useThemeContext()

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Impostazioni</h1>
        <p className="text-muted-foreground mt-2">
          Gestisci il tuo profilo e le impostazioni del tuo account.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-1">Aspetto</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Personalizza l'aspetto dell'applicazione secondo le tue preferenze.
          </p>
          <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
            <button
              onClick={() => setTheme("light")}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all duration-200 ${
                theme === "light"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Sun className="w-6 h-6 mb-3" />
              <span className="text-sm font-medium">Chiaro</span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all duration-200 ${
                theme === "dark"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Moon className="w-6 h-6 mb-3" />
              <span className="text-sm font-medium">Scuro</span>
            </button>
            <button
              onClick={() => setTheme("system")}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all duration-200 ${
                theme === "system"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Laptop className="w-6 h-6 mb-3" />
              <span className="text-sm font-medium">Sistema</span>
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <h2 className="text-lg font-medium mb-1">Sessione</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Disconnettiti su questo dispositivo.
          </p>
          <Button
            variant="outline"
            onClick={() => logout()}
            className="w-full sm:w-auto h-11 gap-3 text-sm font-medium text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            Logout dall'account
          </Button>
        </div>
      </div>
    </div>
  );
};
