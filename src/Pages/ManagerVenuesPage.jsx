import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import { RouteEnum } from "../Utility/routes";
import { getData } from "../Api/getData";
import { ManagerVenues } from "../Components/Common/ManagerVenues";
import { ModalErrorCommon } from "../Components/Modals/ModalErrorCommon";
import { Helmet } from "react-helmet";

/**
 * ManagerVenuesPage Component
 * This component displays a list of venues associated with the logged-in manager.
 * It fetches venue data, including bookings, from the server based on the provided manager ID.
 * The component provides links to view each venue's details and bookings.
 * @component
 * @returns {JSX.Element} - Returns the JSX element representing the ManagerVenuesPage.
 */
export function ManagerVenuesPage() {
  // State hooks for managing component state
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Retrieve manager ID from route parameters
  let { id } = useParams();

  // Fetch venues data from the server on component mount or when the manager ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch venues data from the server including bookings
        const venuesData = await getData(
          `${API_BASE_URL}/profiles/${id}/venues?_bookings=true&_venues=true`
        );
        setVenues(venuesData);
      } catch (error) {
        // Handle errors by displaying an error modal
        setErrorMessage(`An error occurred: ${error.message}`);
        setErrorModalIsOpen(true);
      } finally {
        // Set loading state to false once data is fetched
        setIsLoading(false);
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
        <title>My Venues | Holidaze</title>
        <meta
          name="description"
          content="A manager'a venues list at Holidaze"
        />
      </Helmet>
      <div className="container">
        <div className="my-3">
          <Link to="/">Holidaze</Link> -{" "}
          <Link to={`/${RouteEnum.MANAGER_PROFILE}/${id}`}>Profile</Link> -{" "}
          <Link
            to={`/${RouteEnum.MANAGER_VENUES}/${id}`}
            className="text-decoration-underline"
          >
            My Venues
          </Link>
        </div>
        <h2 className="text-uppercase fs-5 text-center mb-0">A list of</h2>
        <h1 className="text-uppercase fs-1 text-center mb-5">My Venues</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : venues.length === 0 ? (
          <p>You have no venues yet.</p>
        ) : (
          <ManagerVenues venues={venues} />
        )}

        <ModalErrorCommon
          isOpen={errorModalIsOpen}
          closeModal={closeModal}
          errorMessage={errorMessage}
        />
      </div>{" "}
    </div>
  );
}
