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
import { ModalDeleteVenue, ModalEditVenue } from "../Components/Common/Modals";

export function ManagerVenuePage() {
  const [venue, setVenue] = useState({});

  let { id } = useParams();
  const profileName = loadFromLocalStorage("profile").name;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venueData = await getData(
          `${API_BASE_URL}/venues/${id}?_bookings=true`
        );
        setVenue(venueData);
      } catch (error) {
        console.error("Error fetching venue:", error); // TODO: add error modal
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container">
      <div className="my-3">
        <Link to="/">Holidaze</Link> -{" "}
        <Link to={`/${RouteEnum.MANAGER_PROFILE}/${profileName}`}>Profile</Link>{" "}
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
    </div>
  );
}
