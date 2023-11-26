import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { convertToIso } from "../../Utility/formatDate.js";

export const ManagerCalendar = ({ venue }) => {
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
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

            const isoDateString = convertToIso(previoudDate);
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

  const disableDate = ({ date }) => {
    const currentDate = convertToIso(date);
    return date < new Date() || bookedDates.includes(currentDate)
      ? true
      : false;
  };

  const showGuests = ({ date, view }) => {
    const currentDate = convertToIso(date);

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

  const tileClassName = ({ date }) => {
    const dateString = convertToIso(date);
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
