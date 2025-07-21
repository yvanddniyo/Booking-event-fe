import { useState } from "react";
import type { EventCardProps } from "../../type";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";
import Button from "../ReusableComponent/Button";
import { formatDate, formatPrice } from "../../utls/strongPassword";


const EventCard = ({ event, onBookNow, className = "" }: EventCardProps) => {
  const [isBooking, setIsBooking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  console.log("event", event);
  const handleBookNow = async () => {
    if (event.availableSeats <= 0) return;
    
    setIsBooking(true);
    try {

      await new Promise(resolve => setTimeout(resolve, 1000));
      onBookNow?.(event.id);
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Link to={`/events/${event.id}`}>
    <div
      key={event.id}
      className={`relative group cursor-pointer transition-all duration-500 ease-out ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        relative overflow-hidden rounded-2xl
        bg-white/10 backdrop-blur-md border border-white/20
        shadow-2xl transition-all duration-500 ease-out
        ${isHovered ? 'scale-105 shadow-3xl' : 'scale-100'}
        hover:bg-white/15 hover:border-white/30
      `}>
        <div className="absolute inset-0 z-0">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20" />
        </div>

     
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 text-xs font-semibold text-white bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              {event?.category || "No category"}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-white/80">Seats</span>
              <span className="text-sm font-semibold text-white">
                {event?.availableSeats || 0}/{event?.capacity || 0}
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
            {event.title}
          </h3>

          <p className="text-white/80 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          <div className="space-y-2 mb-6">
            <div className="flex items-center space-x-2">
            <Calendar className="size-4 text-white/60" />
              <span className="text-sm text-white/80">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="size-4 text-white/60" />
              <span className="text-sm text-white/80">{event.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="size-4 text-white/60" />
              <span className="text-sm text-white/80">{event.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-xs text-white/60">Price</p>
              <p className="text-2xl font-bold text-white">{formatPrice(event.price)}</p>
            </div>
            
            <Button
              onClick={handleBookNow}
              disabled={event.availableSeats <= 0 || isBooking}
              className={`
                px-6 py-3 rounded-full font-semibold text-sm
                transition-all duration-300 ease-out
                ${event.availableSeats <= 0 
                  ? 'bg-black text-white cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                }
                ${isBooking ? 'opacity-75 cursor-wait' : ''}
              `}
            >
              {isBooking ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Booking...</span>
                </div>
              ) : event.availableSeats <= 0 ? (
                'Sold Out'
              ) : (
                'Book Now'
              )}
            </Button>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs text-white/60">Organized by</p>
            <p className="text-sm font-medium text-white">{event.organizer}</p>
          </div>
        </div>

        <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-1000" />
      </div>
    </div>
    </Link>
  );
};

export default EventCard;