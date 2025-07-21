import { useState } from "react";
import EventCard from "../components/EventPage/EventCard";
import EventSideBar from "../components/EventPage/EventSideBar";
import CardLoaderSkeleton from "../components/Skeleton/CardLoaderSkeleton";
import { useGetEvents } from "../hooks/useRegisterAndLogin";
import type { Event } from "../type";

const Events = () => {
  const [search, setSearch ] = useState("");
  const { data, isLoading} = useGetEvents();
  const filteredEvents = data?.data?.filter((event: Event) => event.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <EventSideBar />
      <div className="flex-1 overflow-y-auto">
        <div className="mb-6">
          <input type="text" placeholder="Search events" className="w-full border border-gray-300 rounded-full p-2 outline-none px-4" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? Array.from({ length: 6 }).map((_, index) => (
            <CardLoaderSkeleton key={index} />
          )) : filteredEvents?.length > 0 ? filteredEvents?.map((event: Event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          )) : <div className="col-span-full text-center py-8">
            No events found
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Events;