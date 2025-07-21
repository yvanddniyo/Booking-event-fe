import type { Dispatch, SetStateAction } from "react";

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  image_url: string;
  availableSeats: number;
  totalSeats: number;
  capacity: number;
  organizer: string;
  // Extended fields for single page
  longDescription?: string;
  highlights?: string[];
  agenda?: AgendaItem[];
  speakers?: Speaker[];
  gallery?: string[];
  tags?: string[];
  contactInfo?: ContactInfo;
  venueDetails?: VenueDetails;
  bookings?: Booking[];
  data: Event[];
}

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
}

export interface Speaker {
  name: string;
  title: string;
  company: string;
  image: string;
  bio: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  website?: string;
}

export interface VenueDetails {
  address: string;
  capacity: number;
  amenities: string[];
  parking: boolean;
  accessibility: boolean;
}

export interface EventCardProps {
  event: Event;
  onBookNow?: (eventId: string) => void;
  className?: string;
}

export interface SinglePageEventProps {
  eventId: string;
  onBack?: () => void;
  onBookNow?: (eventId: string) => void;
}
export interface EventUpdateTabProps {
  eventsData: Event[];
  isEventsLoading: boolean;
  eventsError: Error;
  tab: 'create' | 'events' | 'bookings';
  setTab: Dispatch<SetStateAction<'create' | 'events' | 'bookings'>>;
  setEventId: Dispatch<SetStateAction<string>>;
  bookingsData: Booking[];
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  status: string;
  quantity: number;
  totalPrice: number;
  bookings: Booking[];
}

export interface BookingTabsProps {
  bookingsData: Event[];
  isBookingsLoading: boolean;
  bookingsError: Error;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  image_url: File;
  capacity: number;
}

export interface BookingFormData {
  eventId: string;
  userId: string;
  status: string;
  quantity: number;
  totalPrice: number;
}
export interface DecodedToken {
  id: string;
  role: string;
  email: string;
}

export interface BookingData {
  eventId: string;
  userId: string;
  status: string;
  quantity: number;
  totalPrice: number;
}