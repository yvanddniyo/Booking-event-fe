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
  return response.data;
};

export const getSingleEvent = async (id: string) => {
  const response = await axiosInstance.get(`/events/${id}`);
  return response.data;
};