import { useAuth } from "@/context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createFreelanceCode } from "@/services/settingsService";

export const useCreateCode = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [code, setCode] = useState(user?.unique_freelance_code ?? null);

  const generateCode = async () => {
    setIsCreating(true);
    try {
      const data = await createFreelanceCode();
      setCode(data.code);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    } finally {
      setIsCreating(false);
    }
  };

  return { code, isCreating, generateCode };
};