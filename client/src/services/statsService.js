import api from "../api/client";

export const fetchStats = async () => {
  try {
  const res = await api.get("/api/stats");
  return res.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};
