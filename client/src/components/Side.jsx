import { useState } from "react";
import { NavLink } from "react-router-dom";
import { User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { getFreelancerImage } from "@/services/freelanceSerivce";
import { Loader } from "@/components/Loader";
import { MENU_ITEMS } from "@/constants/side";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const { data: profileImage, isLoading: imageLoading } = useQuery({
    queryKey: ["freelancerImage", user?.id],
    queryFn: () => getFreelancerImage(user.id),
    enabled: !!user?.id,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <aside
      className={[
        "fixed left-0 top-0 z-50 h-full bg-sidebar text-sidebar-foreground",
        "transition-all duration-300 ease-in-out border-r border-sidebar-border",
        isOpen ? "w-64" : "w-16",
      ].join(" ")}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex h-16 items-center border-b border-sidebar-border px-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-sm shadow-primary-500/30"
            style={{ background: "var(--volta-gradient)" }}
          >
            <span className="text-white font-extrabold text-lg tracking-tight">
              V
            </span>
          </div>
          {isOpen && (
            <span className="text-sidebar-foreground text-lg font-extrabold tracking-tight whitespace-nowrap overflow-hidden">
              volta
            </span>
          )}
        </div>
      </div>

      <nav className="py-3">
        {MENU_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                "group relative mx-2 my-0.5 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive ?
                  "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full"
                    style={{ background: "var(--volta-gradient)" }}
                  />
                )}
                <item.icon
                  className={[
                    "w-5 h-5 shrink-0 transition-colors",
                    isActive ? "text-primary-400" : "",
                  ].join(" ")}
                />
                {isOpen && (
                  <span className="overflow-hidden whitespace-nowrap tracking-tight">
                    {item.label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 flex h-16 items-center border-t border-sidebar-border px-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full overflow-hidden bg-sidebar-accent">
            {imageLoading ?
              <Loader size="small" fullScreen={false} />
            : profileImage ?
              <img
                src={profileImage}
                alt="profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            : <User className="w-5 h-5 text-muted-foreground" />}
          </div>
          {isOpen && (
            <span className="text-sidebar-foreground text-sm font-medium tracking-tight whitespace-nowrap overflow-hidden">
              {user?.email}
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};
