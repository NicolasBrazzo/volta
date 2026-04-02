import { useAuth } from "@/context/AuthContext";

import { firstAccess } from "@/services/freelanceSerivce";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/Loader";
import { Navigate } from "react-router-dom";

export const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);

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
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Panoramica delle tue prenotazioni, servizi e statistiche.
      </p>
    </div>
  );
};
