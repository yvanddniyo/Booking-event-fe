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