import type { Event, EventUpdateTabProps } from "../../type";
import { formatDate } from "../../utls/strongPassword";
import Button from "../ReusableComponent/Button";

const EventUpdateTab = ({ eventsData, isEventsLoading, eventsError, setTab, setEventId}: EventUpdateTabProps) => {

  return (
    <div className="overflow-x-auto bg-white/10 p-4 rounded-xl shadow-lg">
    {isEventsLoading ? (
      <div className="text-center py-8">Loading events...</div>
    ) : eventsError ? (
      <div className="text-center text-red-500 py-8">{eventsError.message || 'Failed to load events.'}</div>
    ) : (
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Location</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Seats</th>
            <th className="px-4 py-2 text-center">Edit</th>
          </tr>
        </thead>
        <tbody>
          {eventsData?.map((event: Event) => {
            return(
            <tr key={event.id} className="hover:bg-white/20 transition-colors">
              <td className="px-4 py-2 font-semibold">{event.title}</td>
              <td className="px-4 py-2">{ formatDate(event.date)}</td>
              <td className="px-4 py-2">{event.location}</td>
              <td className="px-4 py-2">{event.price}</td>
              <td className="px-4 py-2">{event.bookings?.length}/{event.capacity}</td>
              <td className="px-4 py-2 flex gap-4">
                <Button className="bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">Edit</Button>
                <Button className="border-2 border-purple-500 text-white rounded-full hover:bg-purple-700 transition-colors" onClick={() => {
                  setEventId(event.id);
                  console.log("eventId", event.id);
                  setTab("bookings");
                }}>Bookings</Button>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    )}
    
  </div>
  );
};

export default EventUpdateTab;