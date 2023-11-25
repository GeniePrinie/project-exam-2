import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { getData } from "../Api/getData";
import { RouteEnum } from "../Utility/routes";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../Utility/constants";
import { CustomerCalendar } from "../Components/Common/CustomerCalendar";
import { VenueInfo } from "../Components/Common/VenueInfo";

export function CustomerVenuePage() {
  const [venue, setVenue] = useState({});
  let { id } = useParams();

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
        <Link to={`/${RouteEnum.VENUES}`}>Venues</Link> -{" "}
        <Link
          to={`/${RouteEnum.CUSTOMER_VENUE}/${id}`}
          className="text-decoration-underline"
        >
          {venue.name}
        </Link>
      </div>
      <VenueInfo venue={venue} />
      <CustomerCalendar venue={venue} />
    </div>
  );
}
