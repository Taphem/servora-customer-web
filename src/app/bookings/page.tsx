import { CalendarCheck } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { EmptyState } from "@/components/ui/EmptyState";

export default function BookingsPage() {
  return (
    <PlaceholderPage
      icon={<CalendarCheck size={22} aria-hidden />}
      eyebrow="Bookings"
      title="Your bookings"
      description="Booking management isn't implemented yet — this route exists so navigation and layout can be verified ahead of that feature. Once customer authentication is real, this page will sit behind it."
    >
      <EmptyState
        icon={<CalendarCheck size={28} aria-hidden />}
        title="No bookings yet"
        description="Upcoming and past bookings will appear here once this feature is built."
      />
    </PlaceholderPage>
  );
}
