import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

import { Loader } from "@/components/Loader";
import { firstAccess } from "@/services/freelanceSerivce";
import { fetchStats } from "@/services/statsService";
import { StatCard } from "@/components/dashboard/StatCard";
import { BookingsChart } from "@/components/dashboard/BookingsChart";
import { formatCurrency } from "@/constants/dashboard";

export const Dashboard = () => {
  const { user } = useAuth();

  const { data: accessData, isFetching: isFetchingAccess } = useQuery({
    queryKey: ["firstAccess", user?.id],
    queryFn: () => firstAccess(user.id),
    enabled: !!user?.id,
  });

  const { data: statsData, isFetching: isFetchingStats } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    enabled: !!user?.id && !accessData?.firstAccess,
  });

  if (isFetchingAccess) return <Loader />;
  if (accessData?.firstAccess) return <Navigate to="/first-access" replace />;

  const stats = statsData?.data;

  return (
    <div className="p-6 space-y-6">
      <div className="page-in">
        <p className="text-[11px] font-bold text-primary-300 uppercase tracking-[0.08em] mb-2">
          Dashboard
        </p>
        <h1>
          <span className="volta-gradient-text">Bentornato.</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Uno sguardo veloce ai tuoi appuntamenti, ai tuoi servizi, al tuo ritmo.
        </p>
      </div>

      {isFetchingStats ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              label="Prenotazioni Totali"
              value={stats?.totalBookings ?? 0}
            />
            <StatCard
              label="Incassi Totali"
              value={formatCurrency(stats?.totalRevenue)}
            />
            <StatCard
              label="Occupazione"
              value={
                stats?.occupancyPercent != null
                  ? `${stats.occupancyPercent}%`
                  : "N/D"
              }
              subtitle="settimana corrente"
            />
          </div>

          <BookingsChart
            weeklyBreakdown={stats?.weeklyBreakdown}
            dailyBreakdown={stats?.dailyBreakdown}
          />
        </>
      )}
    </div>
  );
};
