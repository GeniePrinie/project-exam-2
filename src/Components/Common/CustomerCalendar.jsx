import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDateWithTimezone } from "../../Utility/formatDateWithTimezone";
import { loadFromLocalStorage } from "../../Utility/localStorage";
import { API_BASE_URL } from "../../Utility/constants";
import { postData } from "../../Api/postData";

export const CustomerCalendar = ({ venue }) => {
  const [numGuests, setNumGuests] = useState(1);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const navigate = useNavigate();
  let { id } = useParams();

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

            const isoDateString = previoudDate.toISOString().split("T")[0];
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

  const setCalendarDate = (date) => {
    if (checkInDate === null) {
      setCheckInDate(date);
      setCheckOutDate(date);
    } else if (checkOutDate === null && date >= checkInDate) {
      const isoDateString = date.toISOString();
      const isoCheckInDate = checkInDate.toISOString();

      const isAnyDateBooked = bookedDates.some((bookedDate) => {
        return bookedDate >= isoCheckInDate && bookedDate <= isoDateString;
      });

      if (isAnyDateBooked) {
        setCheckInDate(date);
        setCheckOutDate(null);
      } else {
        setCheckOutDate(date);
      }
    } else {
      setCheckInDate(date);
      setCheckOutDate(null);
    }
  };

  const disableDate = ({ date }) => {
    const isoDateString = date.toISOString().split("T")[0];
    return date < new Date() || bookedDates.includes(isoDateString)
      ? true
      : false;
  };

  const bookVenue = async () => {
    try {
      const apiBody = {
        dateFrom: formatDateWithTimezone(checkInDate),
        dateTo: formatDateWithTimezone(checkOutDate),
        guests: Number(numGuests),
        venueId: id,
      };
      const booking = await postData(`${API_BASE_URL}/bookings`, apiBody);
      navigate(`/customerbookingsuccess/${booking.id}`); // TODO: need booking id in the url
    } catch (error) {
      console.error("Error booking venue:", error); // TODO: add error modal
    }
  };

  const toSignIn = () => {
    navigate("/signin");
  };

  return (
    <div>
      <div className="d-flex justify-content-center pt-3">
        <div>
          <label
            className="border-dark  px-4 my-3"
            style={{
              border: "1px solid",
              borderRadius: "0px",
              paddingTop: "6px",
              paddingBottom: "6px",
            }}
          >
            <b>Guest: </b>
            <input
              className="border-dark"
              type="number"
              min="1"
              max={venue.maxGuests}
              value={numGuests}
              onChange={(e) => setNumGuests(e.target.value)}
              style={{
                border: "1px solid",
                borderRadius: "0px",
                textAlign: "center",
              }}
            />
          </label>
        </div>
        <div className="mx-3">
          <label
            className="border-dark py-2 px-4 my-3"
            style={{
              border: "1px solid",
              borderRadius: "0px",
            }}
          >
            <b>Check-In Date: </b>
            {checkInDate ? checkInDate.toLocaleDateString() : "Not selected"}
          </label>
        </div>
        <div>
          <label
            className="border-dark py-2 px-4 my-3"
            style={{
              border: "1px solid",
              borderRadius: "0px",
            }}
          >
            <b>Check-Out Date: </b>
            {checkOutDate ? checkOutDate.toLocaleDateString() : "Not selected"}
          </label>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Calendar
          onChange={setCalendarDate}
          value={
            checkInDate
              ? checkOutDate
                ? [checkInDate, checkOutDate]
                : checkInDate
              : null
          }
          tileDisabled={disableDate}
          className="calendar"
        />
      </div>
      <div className="d-flex justify-content-center my-4">
        {loadFromLocalStorage("token") ? (
          <button className="btn bg-dark text-light" onClick={bookVenue}>
            Book
          </button>
        ) : (
          <button className="btn bg-dark text-light" onClick={toSignIn}>
            Sign in to book
          </button>
        )}
      </div>
    </div>
  );
};
