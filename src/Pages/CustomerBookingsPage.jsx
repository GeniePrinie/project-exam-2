import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import { RouteEnum } from "../Utility/routes";
import { getData } from "../Api/getData";
import { CustomerBookings } from "../Components/Common/CustomerBookings";
import { ModalErrorCommon } from "../Components/Modals/ModalErrorCommon";
import { Helmet } from "react-helmet";

/**
 * Page component displaying a list of bookings for a customer.
 * @component
 * @returns {JSX.Element} - The rendered CustomerBookingsPage component.
 */
export function CustomerBookingsPage() {
  /**
   * State to hold the customer's profile data.
   * @type {object}
   */
  const [profile, setProfile] = useState({});

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
   * Retrieves and sets the customer's profile data.
   */
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getData(
          `${API_BASE_URL}/profiles/${id}?_bookings=true`
        );
        setProfile(profileData);
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
        <title>My Bookings | Holidaze</title>
        <meta
          name="description"
          content="A list of a user's bookings at Holidaze website"
        />
      </Helmet>
      <div className="container">
        <div className="my-3">
          <Link to="/">Holidaze</Link> -{" "}
          <Link to={`/${RouteEnum.CUSTOMER_PROFILE}/${id}`}>Profile</Link> -{" "}
          <Link
            to={`/${RouteEnum.CUSTOMER_BOOKINGS}/${id}`}
            className="text-decoration-underline"
          >
            My Bookings
          </Link>
        </div>
        <h2 className="text-uppercase fs-5 text-center mb-0">A list of</h2>
        <h1 className="text-uppercase fs-1 text-center mb-5">My Bookings</h1>
        <CustomerBookings profile={profile} />
        <ModalErrorCommon
          isOpen={errorModalIsOpen}
          closeModal={closeModal}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
