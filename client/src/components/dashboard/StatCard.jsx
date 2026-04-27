import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const StatCard = ({ label, value, subtitle }) => (
  <Card>
    <CardHeader className="pb-2">
      <p className="text-[11px] font-bold text-primary-300 uppercase tracking-[0.08em]">
        {label}
      </p>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      )}
    </CardContent>
  </Card>
);
