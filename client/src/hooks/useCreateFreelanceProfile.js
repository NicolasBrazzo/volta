import { getProfile, updateProfile } from "@/services/freelanceSerivce";
import { fetchServices, createService } from "@/services/servicesService";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const INITIAL_PROFILE = { business_name: "", description: "", business_type: "" };
const INITIAL_SERVICE = { name: "", description: "", duration_minutes: "", price: "" };

export const useCreateFreelanceProfile = () => {
  const navigate = useNavigate();
  const { refreshFirstAccess } = useAuth();
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [service, setService] = useState(INITIAL_SERVICE);

  const { data: profileData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { data: servicesData, isLoading: isLoadingServices } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  useEffect(() => {
    if (profileData) {
      setProfile({
        business_name: profileData.business_name || "",
        description: profileData.description || "",
        business_type: profileData.business_type || "",
      });
    }
  }, [profileData]);

  useEffect(() => {
    const services = servicesData?.data;
    if (services && services.length > 0) {
      const first = services[0];
      setService({
        name: first.name || "",
        description: first.description || "",
        duration_minutes: first.duration_minutes ? String(first.duration_minutes) : "",
        price: first.price ? String(first.price) : "",
      });
    }
  }, [servicesData]);

  const isLoading = isLoadingProfile || isLoadingServices;

  const profileMutation = useMutation({ mutationFn: updateProfile });
  const serviceMutation = useMutation({ mutationFn: createService });

  const isSubmitting = profileMutation.isPending || serviceMutation.isPending;

  const validate = () => {
    const required = [profile.business_name, service.name, service.duration_minutes, service.price];
    return required.every(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return showError("Compila tutti i campi obbligatori");

    try {
      await profileMutation.mutateAsync({
        business_name: profile.business_name,
        description: profile.description,
        business_type: profile.business_type,
      });
      await serviceMutation.mutateAsync({
        ...service,
        duration_minutes: Number(service.duration_minutes),
        price: Number(service.price),
        is_active: true,
        color: "#3B82F6",
      });
      await refreshFirstAccess();
      showSuccess("Profilo creato con successo!");
      navigate("/dashboard");
    } catch {
      showError("Errore durante la creazione del profilo");
    }
  };

  const onProfileChange = (key, value) => setProfile((p) => ({ ...p, [key]: value }));
  const onServiceChange = (key, value) => setService((s) => ({ ...s, [key]: value }));

  return { profile, service, onProfileChange, onServiceChange, isSubmitting, isLoading, handleSubmit };
};
