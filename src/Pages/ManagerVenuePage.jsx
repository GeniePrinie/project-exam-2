import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { loadFromLocalStorage } from "../Utility/localStorage";

export function ManagerVenuePage() {
  const [venue, setVenue] = useState([]);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  let { id } = useParams();
  const urlVenue = `${API_BASE_URL}/venues/${id}?_owner=true&_bookings=true`;
  const urlOwner = `${API_BASE_URL}/profiles?_venues=true`;

  const fetchCurrentUser = async () => {
    try {
      const authToken = loadFromLocalStorage("token"); // Adjust this based on how you store your authentication token
      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(urlOwner, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error("Error fetching current user:", error);

      return null;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(urlVenue);
        const json = await response.json();
        setVenue(json);
        document.title = `Holidaze | ${json.name}`;
        const metaDescriptionTag = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescriptionTag) {
          metaDescriptionTag.setAttribute("content", json.description);
        }
        const bookings = json.bookings.map(
          (booking) => booking.dateFrom.split("T")[0]
        );
        setBookedDates(bookings);

        const currentUserData = await fetchCurrentUser();
        setCurrentUser(currentUserData);
      } catch (error) {
        console.log({ error }); //Todo: modal
      }
    }
    fetchData();
  }, [urlVenue]);

  const ReactCalendar = () => {
    const tileContent = ({ date, view }) => {
      const dateString = formatDate(date);
      const bookingInfo = getBookingInfo(dateString);

      return view === "month" ? (
        <div className="booked-tile">
          {bookingInfo && (
            <>
              <div>{bookingInfo.guests} Guests</div>
              <div>Booked</div>
            </>
          )}
        </div>
      ) : null;
    };

    const getBookingInfo = (dateString) => {
      if (venue.bookings && venue.bookings.length > 0) {
        const booking = venue.bookings.find((booking) => {
          const bookingDateString = booking.dateFrom.split("T")[0];
          console.log("Booking dateFrom:", bookingDateString);

          return bookingDateString === dateString;
        });

        console.log("found booking:", booking);
        return booking ? { numGuests: booking.guests } : null;
      }

      return null;
    };

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const tileDisabled = ({ date }) => {
      const dateString = formatDate(date);
      return date < new Date() || bookedDates.includes(dateString);
    };

    const tileClassName = ({ date }) => {
      const dateString = formatDate(date);
      return date < new Date() || bookedDates.includes(dateString)
        ? "disabled-date"
        : date.toDateString() === new Date().toDateString()
        ? "current-date"
        : "";
    };

    return (
      <div>
        <div className="d-flex justify-content-center">
          <Calendar
            value={checkInDate ? checkInDate : null}
            tileDisabled={tileDisabled}
            tileContent={tileContent}
            tileClassName={tileClassName}
            className="calendar"
          />
        </div>
      </div>
    );
  };

  function AccommodationTable() {
    const [accommodationData, setAccommodationData] = useState(null);

    useEffect(() => {
      setAccommodationData(venue.meta);
    }, []);

    return (
      <div>
        <table className="text-uppercase" style={{ border: "1px solid #000" }}>
          <thead
            className="bg-dark text-light border-light "
            style={{ border: "1px solid" }}
          >
            <tr>
              <th className="py-2 px-3 border-1">
                <b>Accomodation</b>
              </th>
              <th className="py-2 px-3 border-1">
                <b>Yes</b>
              </th>
              <th className="py-2 px-3 border-1">
                <b>No</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {accommodationData &&
              Object.entries(accommodationData).map(([feature, value]) => (
                <tr key={feature} style={{ border: "1px solid" }}>
                  <td className="py-2 px-3 border-1">
                    <b>{feature}</b>
                  </td>
                  <td className="py-2 px-3 border-1 text-center">
                    {value ? "x" : ""}
                  </td>
                  <td className="py-2 px-3 border-1 text-center">
                    {!value ? "x" : ""}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="my-3">
        <Link to="/">Holidaze</Link> -{" "}
        <Link to={`/customervenue/${id}`} className="text-decoration-underline">
          {venue.name}
        </Link>
      </div>
      <div className="row text-dark">
        <div className="col-md position-relative">
          <img
            src={venue.media[0]}
            alt={venue.name}
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md ">
          <div>
            <p className="text-uppercase fs-5 mb-0">
              {venue?.location?.address}, {venue?.location?.zip},{" "}
              {venue?.location?.city}, {venue?.location?.country}
            </p>
            <h1 className="text-uppercase fs-1 mb-3">{venue.name}</h1>

            <p className="fs-5">{venue.description}</p>
            <p className="fs-5">
              <b className="text-uppercase">Rating:</b> {venue.rating}/5
            </p>
            <p className="fs-5">
              <b className="text-uppercase">Price:</b> ${venue.price}
            </p>
            <p className="fs-5">
              <b className="text-uppercase">Guest:</b> 1 - {venue.maxGuests}{" "}
              people
            </p>
          </div>
          <AccommodationTable />
        </div>
      </div>

      <div className="d-flex justify-content-center my-4">
        {currentUser &&
          currentUser.venues &&
          currentUser.venues.some((v) => v.id === venue.id) && (
            <>
              <button className="btn bg-dark text-light me-4">Edit</button>
              <button className="btn">Delete</button>
            </>
          )}
      </div>
      <ReactCalendar />
    </div>
  );
}
