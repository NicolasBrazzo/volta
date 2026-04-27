import {
  LayoutDashboard,
  Briefcase,
  Clock,
  CalendarCheck,
  Settings,
} from "lucide-react";

export const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Briefcase, label: "Servizi", path: "/services" },
  { icon: Clock, label: "Disponibilità", path: "/availability" },
  { icon: CalendarCheck, label: "Prenotazioni", path: "/bookings" },
  { icon: Settings, label: "Impostazioni", path: "/settings" },
];
