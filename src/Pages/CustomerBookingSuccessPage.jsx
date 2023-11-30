import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import { getData } from "../Api/getData";
import { RouteEnum } from "../Utility/routes";
import { convertToIsoDate } from "../Utility/convertToIsoDate";
import { ModalErrorCommon } from "../Components/Modals/ModalErrorCommon";
import { Helmet } from "react-helmet";

/**
 * Page component displaying a summary of a customer's booking success.
 * @component
 * @returns {JSX.Element} - The rendered CustomerBookingSuccessPage component.
 */
export function CustomerBookingSuccessPage() {
  /**
   * State to hold the booking data.
   * @type {object}
   */
  const [booking, setBooking] = useState({});

  /**
   * State to manage the visibility of the error modal.
   * @type {boolean}
   */
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

  /**
   * State to hold the error message for displaying in the error modal.
   * @type {string}
   */
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Retrieves and sets the booking data.
   */
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingData = await getData(
          `${API_BASE_URL}/bookings/${id}?_customer=true&_venue=true`
        );
        setBooking(bookingData);
      } catch (error) {
        setErrorMessage(`An error occurred: ${error.message}`);
        setErrorModalIsOpen(true);
      }
    };

    fetchData();
  }, [id]);

  /**
   * Closes the error modal.
   */
  const closeModal = () => {
    setErrorModalIsOpen(false);
  };

  return (
    <div>
      <Helmet>
        <title>Booking Success | Holidaze</title>
        <meta
          name="description"
          content="A customer has booked a venue from Holidaze"
        />
      </Helmet>
      <div className="container">
        <div className="my-3">
          <Link to="/">Holidaze</Link> -{" "}
          <Link
            to={`/${RouteEnum.CUSTOMER_BOOKING_SUCCESS}`}
            className="text-decoration-underline"
          >
            My Booking Summary
          </Link>
        </div>
        <div>
          <div>
            <h2 className="text-uppercase fs-5 text-center mb-0">
              A summary of
            </h2>
            <h1 className="text-uppercase fs-1 text-center mb-5">My Booking</h1>
            <p className="fs-5 mb-5">
              Thank you for booking
              <b className="text-uppercase">
                {" "}
                {booking.venue && booking.venue.name}{" "}
              </b>
              with us! We hope to see you again next time! :)
            </p>
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
                <b>Booking-id:</b> {booking.id}
              </p>
              <p className="fs-5 card-text mb-0">
                <b>Guest:</b> {booking.guests && booking.guests}
              </p>
              <p className="fs-5 card-text mb-0">
                <b>Check-in:</b>{" "}
                {booking.dateFrom &&
                  convertToIsoDate(new Date(booking.dateFrom))}
              </p>
              <p className="fs-5 card-text mb-0">
                <b>Check-out:</b>{" "}
                {booking.dateTo && convertToIsoDate(new Date(booking.dateTo))}
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
        <ModalErrorCommon
          isOpen={errorModalIsOpen}
          closeModal={closeModal}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
