import { ArrowLeft, Calendar, Clock, DollarSign, MapPin, Users } from "lucide-react"
import Button from "../components/ReusableComponent/Button"
import { Link, useParams } from "react-router-dom"

import { useGetSingleEvent } from "../hooks/useRegisterAndLogin"
import { formatDate, formatPrice } from "../utls/strongPassword"
import SinglePageLoader from "../components/Skeleton/SinglePageLoader"

 const SinglePageEvent = () => {
  const { id } = useParams();
  console.log("id -->", id);
  const { data, isLoading, error } = useGetSingleEvent(id || "");
  console.log("data -->", data);
  if(error) {
    return <div>Error: {error.message}</div>
  }
  if(isLoading) {
    return <div>Loading...</div>
  }
  console.log("isLoading -->", isLoading);
  return (
    <>
    {isLoading || !data?.data ? <SinglePageLoader /> : (
      <div className="max-w-7xl mx-auto flex flex-col gap-6 md:p-6 p-2">
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
              <Button className="bg-purple-500 text-white px-4 py-2 w-fit hover:bg-purple-600">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  )
}

export default SinglePageEvent;