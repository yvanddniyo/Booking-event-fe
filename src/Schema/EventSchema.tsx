import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  price: z.number().min(0, "Price is required"),
  capacity: z.number().min(1, "Capacity is required"),
  image_url: z
    .any()
    .refine((file) => file instanceof File, { message: "Image is required" }),
});

export const bookingSchema = z.object({
  eventId: z.string().min(1, "Event is required"),
  userId: z.string().min(1, "User is required"),
  quantity: z.number().min(1, "Quantity is required"),
  totalPrice: z.number().min(0, "Total price is required"),
  status: z.string().min(1, "Status is required"),
});