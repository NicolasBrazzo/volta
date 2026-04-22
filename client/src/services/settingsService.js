import api from "../api/client";

// Genera e salva un nuovo codice univoco per il freelancer
export const createFreelanceCode = async () => {
  try {
    const res = await api.post("/api/freelancers/code");
    return res.data;
  } catch (error) {
    throw error;
  }
};
