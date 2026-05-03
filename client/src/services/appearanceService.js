import api from "@/api/client";

export const saveAppearance = (freelancerId, { booking_page_color, booking_page_layout }) =>
  api.put(`/freelancers/${freelancerId}`, { booking_page_color, booking_page_layout });
