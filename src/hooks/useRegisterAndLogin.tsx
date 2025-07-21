import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSchema, registerSchema } from "../Schema/registerAndLoginSchema";
import { createEvent, getBookingsPerEvent, getEvents, getSingleEvent, loginUser, registerUser, type LoginFormData, type RegisterFormData } from "./FetchingAndPost";

export const useRegister = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange", 
  });
  const { mutate: registerUserMutation, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration successful! Welcome aboard!");
      navigate("/events");
      reset();
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toast.error(error?.response?.data?.error);
      reset();
    },
  });

  return { register, isPending, handleSubmit, errors, isSubmitting, reset, watch, registerUserMutation };
};

export const useLogin = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", 
  });
  const { mutate: loginUserMutation, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Login successful! Welcome back!");
      localStorage.setItem("token", data.token);
      const decodedToken = jwtDecode(data.token) as { role: string };
      const userRole = decodedToken.role;
      if (userRole === "ADMIN") {
        navigate("/admin");
        return;
      }
      localStorage.setItem("user", JSON.stringify(decodedToken));
      navigate("/events");
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toast.error(error?.response?.data?.error);
      reset();
    },
  });

  return { register, isPending, handleSubmit, errors, isSubmitting, reset, watch, loginUserMutation };
};

export const useGetEvents = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return { data, isLoading, error};
};

export const useGetSingleEvent = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getSingleEvent(id),
    enabled: !!id,
  });

  return { data, isLoading, error };
};

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: createEvent,
  });
};

export const useGetBookingsPerEvent = (eventId: string) => {
  return useQuery({
    queryKey: ["bookings", eventId],
    queryFn: () => getBookingsPerEvent(eventId),
    enabled: !!eventId,
  });
};
