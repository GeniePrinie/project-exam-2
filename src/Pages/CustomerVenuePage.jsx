import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { loadFromLocalStorage } from "../Utility/localStorage";

export function CustomerVenuePage() {
  const [venue, setVenue] = useState([]);
  const [numGuests, setNumGuests] = useState(1);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);

  let { id } = useParams();
  const urlVenue = `${API_BASE_URL}/venues/${id}?_bookings=true`;
  const urlBooking = `${API_BASE_URL}/bookings`;

  const navigate = useNavigate();

  const handleBooking = async () => {
    try {
      const authToken = loadFromLocalStorage("token");

      const response = await fetch(urlBooking, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          dateFrom: formatDateWithTimezone(checkInDate),
          dateTo: formatDateWithTimezone(checkOutDate),
          guests: Number(numGuests),
          venueId: id,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        navigate("/customerbookingsuccess");
      }
    } catch (error) {
      console.error("Error booking venue:", error); // Todo: add error modal
    }
  };

  const formatDateWithTimezone = (date) => {
    if (!date) return null;

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(urlVenue);
        const json = await response.json();
        setVenue(json);
        document.title = `Holidaze | ${json.name}`; // Todo: replace this with Helmet
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
      } catch (error) {
        console.log({ error }); // Todo: get the console.log to be modal
      }
    }
    fetchData();
  }, [urlVenue]);

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

  const ReactCalendar = () => {
    const onChange = (date) => {
      if (checkInDate === null) {
        setCheckInDate(date);
        setCheckOutDate(date);
      } else if (checkOutDate === null && date >= checkInDate) {
        setCheckOutDate(date);
      } else {
        setCheckInDate(date);
        setCheckOutDate(null);
      }
    };

    const formatDate = (date) => {
      if (!date) return null;

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      return `${year}-${month}-${day}`;
    };

    const tileDisabled = ({ date, view }) => {
      const dateString = formatDate(date);
      return view === "month" &&
        (date < new Date() || bookedDates.includes(dateString))
        ? "disabled"
        : false;
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
              {checkOutDate
                ? checkOutDate.toLocaleDateString()
                : "Not selected"}
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Calendar
            onChange={onChange}
            value={
              checkInDate
                ? checkOutDate
                  ? [checkInDate, checkOutDate]
                  : checkInDate
                : null
            }
            tileDisabled={tileDisabled}
            className="calendar"
          />
        </div>
      </div>
    );
  };

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
            src={venue.media}
            alt={venue.name}
            style={{ width: "100%", minWidth: "300px" }}
          />
        </div>
        <div className="col-md">
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

      <ReactCalendar />

      <div className="d-flex justify-content-center my-4">
        <button className="btn bg-dark text-light" onClick={handleBooking}>
          Book
        </button>
      </div>
    </div>
  );
}
