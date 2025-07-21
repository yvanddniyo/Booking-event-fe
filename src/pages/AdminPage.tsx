import { useState } from "react";
import BookingTabs from "../components/AdminPage/BookingTabs";
import EventUpdateTab from "../components/AdminPage/EventUpdateTab";
import Button from "../components/ReusableComponent/Button";
import { useEventHooks } from "../hooks/useEventHooks";
import type { Booking, Event, EventFormData } from "../type";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getUserFromToken } from "../utls/jwt";
import { useGetBookingsPerEvent } from "../hooks/useRegisterAndLogin";


const AdminPage = () => {
  const [tab, setTab] = useState<'create' | 'events' | 'bookings'>('create');
  const [eventId, setEventId] = useState<string>("");
  const userInfo = getUserFromToken();
  console.log("userInfo", userInfo);
  const { data: bookingsData, isLoading: isBookingsLoading, error: bookingsError } = useGetBookingsPerEvent(eventId); 

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<EventFormData>();
  const { createEvents, isCreating, eventsData, isEventsLoading, eventsError } = useEventHooks();

  const onSubmit = (data: EventFormData) => {
    if (!data) {
      toast.error("Please fill all the fields");
      return;
    };
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('date', data.date);
    formData.append('location', data.location);
    formData.append('price', String(data.price));
    formData.append('capacity', String(data.capacity));
    if (data.image_url instanceof File) {
      formData.append('image_url', data.image_url);
    }
    createEvents(formData as unknown as Partial<EventFormData>);
    console.log("formData", formData);
    reset();
  };
console.log("eventId", eventId);
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded-full font-semibold transition-all ${tab === 'create' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('create')}
        >Create Event</button>
        <button
          className={`px-4 py-2 rounded-full font-semibold transition-all ${tab === 'events' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('events')}
        >View Events</button>
        
       { tab === "bookings" && <button
          className={`px-4 py-2 rounded-full font-semibold transition-all ${tab === 'bookings' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTab('bookings')}
        >View Bookings</button>}
      </div>
      {tab === 'create' && (
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white/10 p-6 rounded-xl shadow-lg flex flex-col gap-4 -pb-18">
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="font-semibold">Title</label>
        <input type="text" {...register('title')} placeholder="Enter title" className="p-2 rounded border border-gray-300 bg-white/80 text-black outline-none" />
        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="font-semibold">Description</label>
        <textarea {...register('description')} placeholder="Enter description" className="p-2 rounded border border-gray-300 bg-white/80 text-black outline-none" />
        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="font-semibold">Date</label>
        <input type="date" {...register('date')} placeholder="Enter date" className="p-2 rounded border border-gray-300 bg-white/80 text-black outline-none" />
        {errors.date && <span className="text-red-500 text-xs">{errors.date.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="font-semibold">Location</label>
        <input type="text" {...register('location')} placeholder="Enter location" className="p-2 rounded border border-gray-300 bg-white/80 text-black outline-none" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="font-semibold">Price</label>
        <input type="number" {...register('price', { valueAsNumber: true })} placeholder="Enter price" className="p-2 rounded border border-gray-300 bg-white/80 text-black outline-none" />
        {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="image_url" className="font-semibold">Image</label>
        <input
          id="image_url"
          type="file"
          accept="image/*"
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              setValue('image_url', e.target.files[0]);
            }
          }}
          className="p-2 rounded border border-gray-300 bg-white/80 text-black outline-none"
        />
        {errors.image_url && <span className="text-red-500 text-xs">{errors.image_url.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="font-semibold">Capacity</label>
        <input type="number" {...register('capacity', { valueAsNumber: true })} placeholder="Enter capacity" className="p-2 rounded border border-gray-300 bg-white/80 text-black outline-none" />
        {errors.capacity && <span className="text-red-500 text-xs">{errors.capacity.message}</span>}
      </div>
      
      <div className="w-fit mx-auto">
        <Button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors" isLoading={isCreating}>Create Event</Button>
      </div>
      </form>
      )}
      {tab === 'events' && (
      <EventUpdateTab 
        eventsData={eventsData as Event[]}
        isEventsLoading={isEventsLoading}
        eventsError={eventsError as Error}
        tab={tab}
        setTab={setTab}
        setEventId={setEventId}
        bookingsData={bookingsData as Booking[]}
      />
      )}
      {tab === 'bookings' && (
        <BookingTabs
          bookingsData={bookingsData}
          isBookingsLoading={isBookingsLoading}
          bookingsError={bookingsError as Error}
        />
      )}
    </div>
  );
};

export default AdminPage;
