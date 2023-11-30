import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import "react-calendar/dist/Calendar.css";
import { RouteEnum } from "../Utility/routes";
import { getData } from "../Api/getData";
import { VenueInfo } from "../Components/Common/VenueInfo";
import { ManagerCalendar } from "../Components/Common/ManagerCalendar";
import { ManagerBookings } from "../Components/Common/ManagerBookings";
import { loadFromLocalStorage } from "../Utility/localStorage";
import { ModalEditVenue } from "../Components/Modals/ModalEditVenue";
import { ModalDeleteVenue } from "../Components/Modals/ModalDeleteVenue";
import { ModalErrorCommon } from "../Components/Modals/ModalErrorCommon";
import { Helmet } from "react-helmet";

/**
 * ManagerVenuePage Component
 * This component displays detailed information about a specific venue managed by the logged-in manager.
 * It fetches venue data, including bookings, from the server based on the provided venue ID.
 * The component provides features to edit, delete, and view bookings for the venue.
 * @component
 * @returns {JSX.Element} - Returns the JSX element representing the ManagerVenuePage.
 */
export function ManagerVenuePage() {
  // State hooks for managing component state
  const [venue, setVenue] = useState({});
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Retrieve venue ID from route parameters
  let { id } = useParams();

  // Load manager profile name from local storage
  const profileName = loadFromLocalStorage("profile").name;

  // Fetch venue data from the server on component mount or when the venue ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch venue data from the server including bookings
        const venueData = await getData(
          `${API_BASE_URL}/venues/${id}?_bookings=true`
        );
        setVenue(venueData);
      } catch (error) {
        // Handle errors by displaying an error modal
        setErrorMessage(`An error occurred: ${error.message}`);
        setErrorModalIsOpen(true);
      }
    };
    // Call the fetchData function
    fetchData();
  }, [id]);

  // Close the error modal
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
          <Link to={`/${RouteEnum.MANAGER_PROFILE}/${profileName}`}>
            Profile
          </Link>{" "}
          -{" "}
          <Link to={`/${RouteEnum.MANAGER_VENUES}/${profileName}`}>
            My Venues
          </Link>{" "}
          -{" "}
          <Link
            to={`/${RouteEnum.CUSTOMER_VENUE}/${id}`}
            className="text-decoration-underline"
          >
            {venue.name}
          </Link>
        </div>
        <VenueInfo venue={venue} />
        <div className="d-flex justify-content-center my-5">
          <ModalEditVenue />
          <ModalDeleteVenue />
        </div>
        <ManagerCalendar venue={venue} />
        <ManagerBookings venue={venue} />
        <ModalErrorCommon
          isOpen={errorModalIsOpen}
          closeModal={closeModal}
          errorMessage={errorMessage}
        />
      </div>{" "}
    </div>
  );
}
