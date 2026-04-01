import { useAuth } from "@/context/AuthContext";

export const Dashboard = () => {

  const { user } = useAuth();

  console.log("USER DASHBOARD", user);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Panoramica delle tue prenotazioni, servizi e statistiche.
      </p>
    </div>
  );
};
