import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { getData } from "../Api/getData";
import { RouteEnum } from "../Utility/routes";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import { CustomerCalendar } from "../Components/Common/CustomerCalendar";
import { VenueInfo } from "../Components/Common/VenueInfo";
import { ModalErrorCommon } from "../Components/Modals/ModalErrorCommon";
import { Helmet } from "react-helmet";

/**
 * VenuePage Component
 * This component displays details about a specific venue, including its information and bookings.
 * Users can view the venue's details and bookings on a calendar.
 * @component
 * @returns {JSX.Element} - Returns the JSX element representing the VenuePage.
 */
export function VenuePage() {
  // State hooks for managing component state
  const [venue, setVenue] = useState({});
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let { id } = useParams();

  // Fetch venue data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const venueData = await getData(
          `${API_BASE_URL}/venues/${id}?_bookings=true`
        );
        setVenue(venueData);
      } catch (error) {
        setErrorMessage(`An error occurred: ${error.message}`);
        setErrorModalIsOpen(true);
      }
    };

    fetchData();
  }, [id]);

  // Function to close the error modal
  const closeModal = () => {
    setErrorModalIsOpen(false);
  };

  return (
    <div>
      <Helmet>
        <title>{venue ? `${venue.name} | Holidaze` : "Holidaze"}</title>
        <meta
          name="description"
          content={venue ? `${venue.description}` : "Holidaze"}
        />
      </Helmet>
      <div className="container">
        <div className="my-3">
          <Link to="/">Holidaze</Link> -{" "}
          <Link to={`/${RouteEnum.VENUES}`}>Venues</Link> -{" "}
          <Link
            to={`/${RouteEnum.CUSTOMER_VENUE}/${id}`}
            className="text-decoration-underline"
          >
            {venue.name}
          </Link>
        </div>
        <VenueInfo venue={venue} />
        <CustomerCalendar venue={venue} id={id} />
        <ModalErrorCommon
          isOpen={errorModalIsOpen}
          closeModal={closeModal}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
