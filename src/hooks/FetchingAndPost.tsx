import type { BookingFormData, EventFormData } from "../type";
import { axiosInstance } from "../utls/axios";

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterFormData) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginFormData) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const getEvents = async () => {
  const response = await axiosInstance.get("/events");
  return response.data.data;
};

export const getSingleEvent = async (id: string) => {
  const response = await axiosInstance.get(`/events/${id}`);
  return response.data;
};

export const createEvent = async (data: Partial<EventFormData>) => {
  const response = await axiosInstance.post("/events", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getBookingsPerEvent = async (eventId: string) => {
  const response = await axiosInstance.get(`events/${eventId}/bookings`);
  return response.data.data;
};

export const createBooking = async (data: BookingFormData) => {
  const response = await axiosInstance.post("/bookings",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
};

export const getBookingsPerUser = async (userId: string) => {
  const response = await axiosInstance.get(`/bookings/${userId}`);
  return response.data.data;
};
