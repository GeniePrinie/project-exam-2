import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import { getData } from "../Api/getData";

export function CustomerBookingSuccessPage() {
  const [booking, setBooking] = useState({});
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingData = await getData(
          `${API_BASE_URL}/bookings/${id}?_customer=true&_venue=true`
        );
        setBooking(bookingData);
      } catch (error) {
        console.error(error); // TODO: add error modal
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container">
      <div className="my-3">
        <Link to="/">Holidaze</Link> -{" "}
        <Link
          to="/customerbookingsuccess"
          className="text-decoration-underline"
        >
          My Booking Summary
        </Link>
      </div>
      <div>
        <div>
          <h2 className="text-uppercase fs-5 text-center mb-0">A summary of</h2>
          <h1 className="text-uppercase fs-1 text-center mb-5">My Booking</h1>
        </div>
        <div className="d-flex justify-content-center mb-5">
          <div
            className="mx-auto border card-body border-dark px-5 py-3"
            style={{ maxWidth: "500px" }}
          >
            <div className="text-center py-4">
              <img
                src={booking.venue && booking.venue.media[0]}
                alt="name"
                style={{ width: "100%", maxHeight: "400px" }}
              />
            </div>
            <h3 className="card-title text-uppercase fs-4 font-weight-bold">
              <b>{booking.venue && booking.venue.name}</b>
            </h3>
            <p className="fs-5 card-text mb-0">
              <b>Confirmation-id:</b> {booking.id && booking.id.substring(0, 7)}
            </p>
            <p className="fs-5 card-text mb-0">
              <b>Guest:</b> {booking.guests && booking.guests}
            </p>
            <p className="fs-5 card-text mb-0">
              <b>Check-in:</b>{" "}
              {booking.dateFrom && booking.dateFrom.split("T")[0]}
            </p>
            <p className="fs-5 card-text mb-0">
              <b>Check-out:</b> {booking.dateTo && booking.dateTo.split("T")[0]}
            </p>

            <div
              className="border-dark my-3"
              style={{ borderTop: "1px solid" }}
            ></div>
            <div className="d-flex justify-content-between">
              <p className="fs-5 card-text mb-0">
                <b>Total: </b>
              </p>
              <p>${booking.venue && booking.venue.price}</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Link to="/">
            <button className="btn text-light bg-dark">Back to home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
