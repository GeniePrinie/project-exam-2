import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { convertToIsoDate } from "../../Utility/convertToIsoDate.js";

/**
 * Component representing a calendar for a venue manager.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.venue - The venue details.
 * @returns {JSX.Element} - The rendered ManagerCalendar component.
 */
export const ManagerCalendar = ({ venue }) => {
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    /**
     * Extracts booked dates from venue bookings and updates state.
     */
    const bookings = () => {
      let extractedDates = [];

      venue.bookings &&
        venue.bookings.forEach((booking) => {
          const startDate = new Date(booking.dateFrom);
          const endDate = new Date(booking.dateTo);
          const currentDate = new Date(startDate);

          while (currentDate <= endDate) {
            const previoudDate = new Date(currentDate);
            previoudDate.setDate(previoudDate.getDate() - 1);

            const isoDateString = convertToIsoDate(previoudDate);
            if (!extractedDates.includes(isoDateString)) {
              extractedDates.push(isoDateString);
            }
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });

      setBookedDates(extractedDates);
    };
    bookings();
  }, [venue.bookings]);

  /**
   * Disables dates in the calendar that are in the past or already booked.
   * @param {Object} date - The date object to be disabled.
   * @param {Date} date.date - The date to be disabled.
   * @returns {boolean} - True if the date should be disabled, otherwise false.
   */
  const disableDate = ({ date }) => {
    const currentDate = convertToIsoDate(date);
    return date < new Date() || bookedDates.includes(currentDate)
      ? true
      : false;
  };

  /**
   * Displays guests information for a booked date in the calendar.
   * @param {Object} date - The date object for which to display guest information.
   * @param {string} view - The current view of the calendar (e.g., "month", "week").
   * @returns {JSX.Element|null} - The rendered content for the tile or null if not applicable.
   */
  const showGuests = ({ date, view }) => {
    const currentDate = convertToIsoDate(date);

    const bookingInfo =
      venue &&
      venue.bookings &&
      venue.bookings.find((booking) => bookedDates.includes(currentDate));

    return view === "month" && bookingInfo ? (
      <div className="booked-tile">
        {bookingInfo && (
          <>
            <div>{`Guests: ${bookingInfo.guests}`}</div>
          </>
        )}
      </div>
    ) : null;
  };

  /**
   * Determines the class name for a calendar tile based on the date and booked status.
   * @param {Object} date - The date object for which to determine the class name.
   * @returns {string} - The class name for the tile.
   */
  const tileClassName = ({ date }) => {
    const dateString = convertToIsoDate(date);
    return date.toDateString() === new Date().toDateString()
      ? "current-date"
      : date < new Date() || bookedDates.includes(dateString)
      ? "disabled-date"
      : "";
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Calendar
          value={new Date()}
          tileDisabled={disableDate}
          tileContent={showGuests}
          tileClassName={tileClassName}
          className="calendar"
        />
      </div>
    </div>
  );
};
