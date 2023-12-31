import Calendar from "react-calendar";
import { RouteEnum } from "../../Utility/routes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadFromLocalStorage } from "../../Utility/localStorage";
import { API_BASE_URL } from "../../Utility/constants";
import { postData } from "../../Api/postData";
import {
  convertToIsoDateInString,
  convertFromDateToIsoOutput,
  convertIsoDateToNoon,
} from "../../Utility/convertDate";
import { ModalErrorCommon } from "../Modals/ModalErrorCommon";

/**
 * Component representing a calendar for booking a venue.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.venue - The venue details.
 * @param {string} props.id - The venue ID.
 * @returns {JSX.Element} - The rendered CustomerCalendar component.
 */
export const CustomerCalendar = ({ venue, id }) => {
  const [numGuests, setNumGuests] = useState(1);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const token = loadFromLocalStorage("token");
  const profile = loadFromLocalStorage("profile");

  useEffect(() => {
    const bookings = () => {
      let extractedDates = [];

      venue.bookings &&
        venue.bookings.forEach((booking) => {
          const startDate = new Date(convertIsoDateToNoon(booking.dateFrom));
          const endDate = new Date(convertIsoDateToNoon(booking.dateTo));
          const currentDate = new Date(startDate);

          while (currentDate <= endDate) {
            const isoDateString = convertToIsoDateInString(currentDate);
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
   * Sets the selected date in the calendar for check-in and check-out.
   * @param {Date} date - The selected date.
   */
  const setCalendarDate = (date) => {
    if (checkInDate === null) {
      setCheckInDate(date);
      setCheckOutDate(date);
    } else if (checkOutDate === null && date >= checkInDate) {
      const isAnyDateBooked = bookedDates.some((bookedDate) => {
        return (
          bookedDate >= convertToIsoDateInString(checkInDate) &&
          bookedDate <= convertToIsoDateInString(date)
        );
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

  /**
   * Disables dates in the calendar that are in the past or already booked.
   * @param {Object} date - The date object to be disabled.
   * @param {Date} date.date - The date to be disabled.
   * @returns {boolean} - True if the date should be disabled, otherwise false.
   */
  const disableDate = ({ date }) => {
    const isoDateString = convertToIsoDateInString(date);
    const newDate = new Date();
    // Set time to midnight to make it possible to book from today's date
    newDate.setHours(0, 0, 0, 0);
    return date < newDate || bookedDates.includes(isoDateString) ? true : false;
  };

  /**
   * Attempts to book the venue based on selected dates and number of guests.
   * Navigates to a success page if successful, shows an error modal otherwise.
   */
  const bookVenue = async () => {
    try {
      const apiBody = {
        dateFrom: convertToIsoDateInString(new Date(checkInDate)),
        dateTo: convertToIsoDateInString(new Date(checkOutDate)),
        guests: Number(numGuests),
        venueId: id,
      };
      const booking = await postData(`${API_BASE_URL}/bookings`, apiBody);
      navigate(`/${RouteEnum.CUSTOMER_BOOKING_SUCCESS}/${booking.id}`);
    } catch (error) {
      setErrorMessage(`An error occurred: ${error.message}`);
      setErrorModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setErrorModalIsOpen(false);
  };

  const toSignIn = () => {
    navigate(`/${RouteEnum.SIGN_IN}`);
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
            {checkInDate
              ? convertFromDateToIsoOutput(checkInDate)
              : "Not selected"}
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
            {checkOutDate
              ? convertFromDateToIsoOutput(checkOutDate)
              : "Not selected"}
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
        {token && profile && !profile.venueManager ? (
          <button className="btn bg-dark text-light" onClick={bookVenue}>
            Book
          </button>
        ) : (
          <button className="btn bg-dark text-light" onClick={toSignIn}>
            Sign in as user to book
          </button>
        )}
      </div>
      <ModalErrorCommon
        isOpen={errorModalIsOpen}
        closeModal={closeModal}
        errorMessage={errorMessage}
      />
    </div>
  );
};
