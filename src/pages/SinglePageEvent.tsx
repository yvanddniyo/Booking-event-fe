import { ArrowLeft, Calendar, Clock, DollarSign, MapPin, Users } from "lucide-react"
import Button from "../components/ReusableComponent/Button"
import { Link, useParams } from "react-router-dom"

import { useGetSingleEvent } from "../hooks/useRegisterAndLogin"
import { formatDate, formatPrice } from "../utls/strongPassword"
import SinglePageLoader from "../components/Skeleton/SinglePageLoader"
import { useGetUserBookings } from "../hooks/useEventHooks"
import { useState } from 'react';
import { BookingModal } from '../components/EventPage/BookingModal';
import { getUserFromToken } from "../utls/jwt"

 const SinglePageEvent = () => {
  const { id } = useParams();
  const decodedToken = getUserFromToken()
  const userId = decodedToken?.id
  const { data, isLoading, error } = useGetSingleEvent(id || "");
  const { bookingsData, isBookingsLoading } = useGetUserBookings(userId || "");
  const [isModalOpen, setModalOpen] = useState(false);
  console.log("bookingsData -->", bookingsData);
  if(error) {
    return <div>Error: {error.message}</div>
  }
  if(isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <SinglePageLoader />
    </div>
  }  

  if(isBookingsLoading) {
    return <div className="flex justify-center items-center h-screen">
      <SinglePageLoader />
    </div>
  }
  return (
    <>
    {isLoading || !data?.data ? <SinglePageLoader /> : (
      <div className="max-w-7xl h-screen mx-auto flex flex-col gap-6 md:p-6 p-2">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-2xl font-bold ">{data?.data?.title}</h1>
          <Link to="/events">
          <ArrowLeft className="size-8 cursor-pointer"  />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 w-full border-[0.5px] border-gray-200 rounded-lg p-4">
            <img src={data?.data?.image_url} alt="event image" className="w-full h-full object-cover rounded-lg"/>
      
          </div>
          <div className="flex-1 border-[0.5px] border-gray-200 rounded-lg p-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{data?.data?.title}</h1>
            <p className="font-normal">{data?.data?.description}</p>
            <div className="flex items-center gap-2">
              <div className="bg-blue-400 rounded-full p-2">
              <MapPin className="size-4" />
              </div>
              <p>{data?.data?.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-green-400 rounded-full p-2">
              <Calendar className="size-4" />
              </div>
              <p>{formatDate(data?.data?.date)}</p>
            </div>
            {data?.data?.time && (<div className="flex items-center gap-2">
              <div className="bg-yellow-400 rounded-full p-2">
              <Clock className="size-4" />
              </div>
              <p>{data?.data?.time}</p>
            </div>)}
            <div className="flex items-center gap-2">
              <div className="bg-purple-400 rounded-full p-2">
              <Users className="size-4" />
              </div>
              <p>Seats: {data?.data?.availableSeats || 0}/{data?.data?.capacity || 0}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-red-400 rounded-full p-2">
              <DollarSign className="size-4" />
              </div>
              <p>Price: {formatPrice(data?.data?.price)}</p>
            </div>
            <div className="flex justify-center">
              <Button
                className="bg-purple-500 text-white px-4 py-2 w-fit hover:bg-purple-600"
                onClick={() => setModalOpen(true)}
              >
                Book Now
              </Button>
            </div>
            <BookingModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
            />
          </div>
        </div>
        <div className="">
          <h2 className="text-xl font-semibold mb-2">Your Booked Tickets</h2>
          {bookingsData && bookingsData.length > 0 ? (
            // @ts-expect-error - booking is of type any
            bookingsData.map((booking) => (
              <div
                key={booking.id}
                className="border-[0.5px] border-gray-200 rounded-lg p-4 mb-4  shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="font-bold text-lg">{booking.event.title}</div>
                    <div className="text-sm">{booking.event.location}</div>
                    <div className="text-sm">
                      Date: {formatDate(booking.event.date)}
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={
                          booking.status === "PENDING"
                            ? "text-yellow-600"
                            : booking.status === "CONFIRMED"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Quantity:</span> {booking.quantity}
                    </div>
                    <div>
                      <span className="font-semibold">Total Price:</span> {formatPrice(booking.totalPrice)}
                    </div>
                    <div>
                      <span className="font-semibold">Booked At:</span> {formatDate(booking.createdAt)}
                    </div>
                  </div>
                  <div>
                    <Button className="bg-red-500 text-white px-4 py-2 w-fit hover:bg-red-600">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">You have not booked any tickets for this event.</div>
          )}
        </div>
    
      </div>
      )}
    </>
  )
}

export default SinglePageEvent;