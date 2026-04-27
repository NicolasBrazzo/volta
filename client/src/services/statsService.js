import api from "../api/client";

export const fetchStats = async () => {
  const res = await api.get("/api/stats");
  return res.data;
};
