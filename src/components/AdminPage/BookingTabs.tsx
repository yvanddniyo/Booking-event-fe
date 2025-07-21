import type { BookingTabsProps } from "../../type";
import { formatDate } from "../../utls/strongPassword";
const BookingTabs = ({ bookingsData, isBookingsLoading, bookingsError }: BookingTabsProps) => {
  return (
    <div className="overflow-x-auto bg-white/10 p-4 rounded-xl shadow-lg">
    {isBookingsLoading ? (
      <div className="text-center py-8">Loading bookings...</div>
    ) : bookingsError ? (
      <div className="text-center text-red-500 py-8">{bookingsError.message || 'Failed to load bookings.'}</div>
    ) : (
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Booking ID</th>
            <th className="px-4 py-2 text-left">Event</th>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Seats</th>
            <th className="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {
            // @ts-expect-error - booking is of type any
            bookingsData?.bookings?.length > 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center">No bookings found</td>
              </tr>
            ):
     (     bookingsData?.map((booking) => (
            <tr key={booking.id} className="hover:bg-white/20 transition-colors">
              <td className="px-4 py-2 font-semibold">{booking.id}</td>
              {/* @ts-expect-error - booking is of type any */}
              <td className="px-4 py-2">{booking.title || booking.event?.title || '-'}</td>
              <td className="px-4 py-2">{booking.bookings?.length}</td>
              <td className="px-4 py-2">{formatDate(booking.date) || '-'}</td>
            </tr>
          )))}
        </tbody>
      </table>
    )}
  </div>
  );
};

export default BookingTabs;