import { useForm } from "react-hook-form";
import { bookingSchema, eventSchema } from "../Schema/EventSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createBooking, createEvent, getBookingsPerUser, getEvents } from "./FetchingAndPost";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { BookingFormData, EventFormData } from "../type";

export const useEventHooks = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset} = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    mode: "onChange",
  });

  const { mutate: createEvents, isPending: isCreating } = useMutation({
    mutationFn: createEvent,
    onSuccess: (data) => {
      console.log("data", data);
      toast.success("Event created successfully!");
      reset();
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toast.error(error?.response?.data?.error);
      reset();
    },
  });

  const { data: eventsData, isLoading: isEventsLoading, error: eventsError } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return { createEvents, isCreating, register, handleSubmit, errors, isSubmitting, eventsData, isEventsLoading, eventsError, watch };
}

export const useCreateBooking = () => {
  const { register, handleSubmit, formState: { isSubmitting }, reset, watch, setValue } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
  });

  const { mutate: createBookingMutation, isPending: isBookingPending } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("Booking created successfully!");
      reset();
    },
    onError: (error: AxiosError<{ error: string }>) => {
      toast.error(error?.response?.data?.error);
      reset();
    },
  });

  return { createBookingMutation, isBookingPending, register, handleSubmit, isSubmitting, setValue, watch };
}

export const useGetUserBookings = (userId: string) => {
  const { data: bookingsData, isLoading: isBookingsLoading, error: bookingsError } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBookingsPerUser(userId),
  });

  return { bookingsData, isBookingsLoading, bookingsError };
}