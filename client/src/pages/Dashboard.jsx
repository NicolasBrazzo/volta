import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Loader } from "@/components/Loader";
import { firstAccess } from "@/services/freelanceSerivce";
import { fetchStats } from "@/services/statsService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CHART_COLOR, formatCurrency } from "@/constants/dashboard";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2 text-sm shadow-md">
      <p className="font-semibold text-foreground">{label}</p>
      <p className="text-muted-foreground">
        {payload[0].value} prenotazion{payload[0].value === 1 ? "e" : "i"}
      </p>
    </div>
  );
};

export const Dashboard = () => {
  const { user } = useAuth();
  const [view, setView] = useState("week");

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
  const chartData =
    view === "week" ? stats?.weeklyBreakdown : stats?.dailyBreakdown;
  const chartKey = view === "week" ? "day" : "time";

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
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <p className="text-[11px] font-bold text-primary-300 uppercase tracking-[0.08em]">
                  Prenotazioni Totali
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.totalBookings ?? 0}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <p className="text-[11px] font-bold text-primary-300 uppercase tracking-[0.08em]">
                  Incassi Totali
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">
                  {formatCurrency(stats?.totalRevenue)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <p className="text-[11px] font-bold text-primary-300 uppercase tracking-[0.08em]">
                  Occupazione
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.occupancyPercent != null
                    ? `${stats.occupancyPercent}%`
                    : "N/D"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  settimana corrente
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-4">
              <CardTitle>Prenotazioni</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setView((v) => (v === "week" ? "day" : "week"))}
              >
                {view === "week" ? "Settimana" : "Oggi"}
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={chartData ?? []}
                  margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey={chartKey}
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                  />
                  <Bar
                    dataKey="count"
                    fill={CHART_COLOR}
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
