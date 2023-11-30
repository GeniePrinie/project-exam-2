import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { getData } from "../Api/getData";
import { RouteEnum } from "../Utility/routes";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import { CustomerCalendar } from "../Components/Common/CustomerCalendar";
import { VenueInfo } from "../Components/Common/VenueInfo";
import { ModalErrorCommon } from "../Components/Modals/ModalErrorCommon";

export function VenuePage() {
  const [venue, setVenue] = useState({});
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let { id } = useParams();

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

  const closeModal = () => {
    setErrorModalIsOpen(false);
  };

  return (
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
  );
}
