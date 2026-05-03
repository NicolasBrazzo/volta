import { cn } from "@/utils/cnFunc";
import { COLOR_PRESETS } from "@/constants/appearance";

const FreelancerAvatar = ({ freelancer, size = "lg" }) => {
  const initials = `${freelancer.first_name?.[0] ?? ""}${freelancer.last_name?.[0] ?? ""}`.toUpperCase();
  const sizeClass = size === "sm"
    ? "w-12 h-12 text-lg"
    : "w-20 h-20 text-2xl";
  return freelancer.profile_image ? (
    <img
      src={freelancer.profile_image}
      alt=""
      className={cn(sizeClass, "rounded-full object-cover border-2 border-border shrink-0")}
    />
  ) : (
    <div className={cn(sizeClass, "rounded-full bg-foreground text-background flex items-center justify-center font-semibold tracking-tight select-none shrink-0")}>
      {initials || "?"}
    </div>
  );
};

export const BookingLayout = ({ layout = "sidebar", primaryColor, freelancer, sidebarExtra, children }) => {
  const fullName = [freelancer.first_name, freelancer.last_name].filter(Boolean).join(" ");
  const primary = primaryColor || COLOR_PRESETS[0].hex;

  if (layout === "centered") {
    return (
      <div style={{ "--primary": primary, "--ring": primary }} className="min-h-screen bg-muted/30">
        <div className="max-w-2xl mx-auto px-4 py-10 md:py-16 space-y-6">
          <div className="bg-background border rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <FreelancerAvatar freelancer={freelancer} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold leading-tight">{fullName}</p>
              {freelancer.business_name && (
                <p className="text-sm text-muted-foreground">{freelancer.business_name}</p>
              )}
            </div>
          </div>
          {freelancer.description && (
            <p className="text-sm text-muted-foreground leading-relaxed px-1">{freelancer.description}</p>
          )}
          {sidebarExtra && (
            <div className="bg-background border rounded-2xl p-4 shadow-sm">{sidebarExtra}</div>
          )}
          <main>{children}</main>
        </div>
      </div>
    );
  }

  if (layout === "minimal") {
    return (
      <div style={{ "--primary": primary, "--ring": primary }} className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-10 md:py-16 space-y-6">
          <div className="flex items-center gap-3 pb-5 border-b">
            <FreelancerAvatar freelancer={freelancer} size="sm" />
            <div>
              <p className="font-semibold">{fullName}</p>
              {freelancer.business_name && (
                <p className="text-sm text-muted-foreground">{freelancer.business_name}</p>
              )}
            </div>
          </div>
          {sidebarExtra && <div className="text-sm">{sidebarExtra}</div>}
          <main>{children}</main>
        </div>
      </div>
    );
  }

  // Default: sidebar
  return (
    <div style={{ "--primary": primary, "--ring": primary }} className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <aside className="w-full md:w-72 md:sticky md:top-10 shrink-0">
            <div className="bg-background border rounded-2xl p-6 space-y-5 shadow-sm">
              <div className="flex flex-col items-center text-center gap-3">
                <FreelancerAvatar freelancer={freelancer} />
                <div>
                  <p className="font-semibold text-lg leading-tight">{fullName}</p>
                  {freelancer.business_name && (
                    <p className="text-sm text-muted-foreground mt-0.5">{freelancer.business_name}</p>
                  )}
                </div>
              </div>
              {freelancer.description && (
                <>
                  <div className="border-t" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{freelancer.description}</p>
                </>
              )}
              {sidebarExtra && <div className="border-t pt-4">{sidebarExtra}</div>}
            </div>
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};
