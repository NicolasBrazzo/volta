import { useAuth } from "@/context/AuthContext";

import { firstAccess } from "@/services/freelanceSerivce";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/Loader";
import { Navigate } from "react-router-dom";
import { useReveal } from "@/hooks/Home2/useReveal";

export const Dashboard = () => {
  const { user } = useAuth();
  useReveal();

  const { data, isFetching } = useQuery({
    queryKey: ["firstAccess", user?.id],
    queryFn: () => firstAccess(user.id),
    enabled: !!user?.id,
  });

  if (isFetching) return <Loader />;

  if (data?.firstAccess) {
    return <Navigate to="/first-access" replace />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="h2-reveal">
        <p className="text-[11px] font-bold text-primary-300 uppercase tracking-[0.08em] mb-2">Dashboard</p>
        <h1><span className="volta-gradient-text">Bentornato.</span></h1>
        <p className="text-muted-foreground mt-2">
          Uno sguardo veloce ai tuoi appuntamenti, ai tuoi servizi, al tuo ritmo.
        </p>
      </div>
    </div>
  );
};
