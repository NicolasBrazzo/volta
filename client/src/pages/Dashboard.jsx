import { useAuth } from "@/context/AuthContext";

import { firstAccess } from "@/services/freelanceSerivce";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/Loader";
import { Navigate } from "react-router-dom";

export const Dashboard = () => {
  const { user } = useAuth();

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
      <h1 className="text-2xl font-semibold tracking-tight">Bentornato.</h1>
      <p className="text-muted-foreground">
        Uno sguardo veloce ai tuoi appuntamenti, ai tuoi servizi, al tuo ritmo.
      </p>
    </div>
  );
};
